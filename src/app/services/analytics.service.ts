import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { AnalyticsMetricsService } from './analytics-metrics.service';
import { downloadCsv } from 'src/app/utils/csv-export.util';
import {
  AnalyticsFilterState,
  AnalyticsLoadResult,
  AnalyticsPreset,
  ChartSeriesPayload,
  OrderStatusBreakdown,
  TopPartnerRow,
} from '../models/analytics.models';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private cacheKey = '';
  private cache: AnalyticsLoadResult | null = null;

  constructor(
    private http: HttpClient,
    private storage: DataService,
    private metrics: AnalyticsMetricsService
  ) {}

  buildFilterFromPreset(preset: AnalyticsPreset): AnalyticsFilterState {
    const today = dayjs();
    let start = today.startOf('day');
    let end = today.endOf('day');

    switch (preset) {
      case '7d':
        start = today.subtract(6, 'day').startOf('day');
        break;
      case '30d':
        start = today.subtract(29, 'day').startOf('day');
        break;
      case 'mtd':
        start = today.startOf('month');
        break;
      case 'ytd':
        start = today.startOf('year');
        break;
      case 'today':
      default:
        break;
    }

    return {
      preset,
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      granularity: preset === 'ytd' ? 'month' : 'day',
    };
  }

  previousRange(filters: AnalyticsFilterState): { startDate: string; endDate: string } {
    const start = dayjs(filters.startDate);
    const end = dayjs(filters.endDate);
    const days = end.diff(start, 'day') + 1;
    return {
      startDate: start.subtract(days, 'day').format('YYYY-MM-DD'),
      endDate: start.subtract(1, 'day').format('YYYY-MM-DD'),
    };
  }

  clearCache(): void {
    this.cache = null;
    this.cacheKey = '';
  }

  loadDashboardSnapshot(filters: AnalyticsFilterState, force = false): Observable<AnalyticsLoadResult> {
    const key = this.cacheKeyFor(filters);
    if (!force && this.cache && this.cacheKey === key) {
      return of(this.cache);
    }

    const iso = { startDate: filters.startDate, endDate: filters.endDate };

    return this.getAnalyticsSummary(filters).pipe(
      switchMap((summary) => {
        const base = this.mapSummaryToResult(summary, filters);
        return this.getRecentOrders(iso.startDate, iso.endDate).pipe(
          map((recentOrders) => {
            const errors = { ...base.errors };
            if (!recentOrders || (recentOrders as any).error) {
              errors['recentOrders'] =
                (recentOrders as any)?.error?.message ||
                (recentOrders as any)?.error?.error?.message ||
                'Failed to load recent orders';
            }

            const result: AnalyticsLoadResult = {
              ...base,
              recentOrders: this.normalizeRecentOrders(recentOrders),
              errors,
            };

            this.metrics.validateReconciliation(result);
            this.cacheKey = key;
            this.cache = result;
            return result;
          })
        );
      })
    );
  }

  loadAll(filters: AnalyticsFilterState, force = false): Observable<AnalyticsLoadResult> {
    const key = this.cacheKeyFor(filters);
    if (!force && this.cache && this.cacheKey === key && this.cacheHasWidgets(this.cache)) {
      return of(this.cache);
    }

    const iso = { startDate: filters.startDate, endDate: filters.endDate };
    const sort = filters.granularity === 'year' ? 'month' : filters.granularity;

    const summary$ =
      !force && this.cache && this.cacheKey === key
        ? of(this.cache)
        : this.getAnalyticsSummary(filters).pipe(map((summary) => this.mapSummaryToResult(summary, filters)));

    return summary$.pipe(
      switchMap((base) =>
        forkJoin({
          earningsBreakdown: this.getEarningsBreakdown(iso.startDate, iso.endDate),
          topPartners: this.getTopPartners(iso.startDate, iso.endDate),
          topDishes: this.getMostSellingProducts(iso.startDate, iso.endDate),
          customerActivity: this.getCustomerMapChartData(sort, iso.startDate, iso.endDate),
          ratings: this.getRatingStatistics(iso.startDate, iso.endDate),
          settlementsPending: this.getPartnerSettlements(false, iso.startDate, iso.endDate),
          settlementsSettled: this.getPartnerSettlements(true, iso.startDate, iso.endDate),
          settlementAnalytics: this.getSettlementAnalytics(iso.startDate, iso.endDate),
          geoClusters: this.getUserLocationClusters(),
          recentOrders: this.getRecentOrders(iso.startDate, iso.endDate),
        }).pipe(
          map((extra) => {
            const errors = { ...base.errors };
            const unwrap = (res: any, field: string) => {
              if (!res || res.error) {
                errors[field] = res?.error?.message || res?.error?.error?.message || 'Failed to load';
                return null;
              }
              return res?.data ?? res;
            };

            const result: AnalyticsLoadResult = {
              ...base,
              earningsBreakdown: unwrap(extra.earningsBreakdown, 'earningsBreakdown') || {},
              topPartners: (unwrap(extra.topPartners, 'topPartners') || []) as TopPartnerRow[],
              topDishes: unwrap(extra.topDishes, 'topDishes') || [],
              customerActivity: unwrap(extra.customerActivity, 'customerActivity') || [],
              ratings: unwrap(extra.ratings, 'ratings') || {},
              settlementsPending: this.countSettlements(extra.settlementsPending),
              settlementsSettled: this.countSettlements(extra.settlementsSettled),
              settlementAnalytics: unwrap(extra.settlementAnalytics, 'settlementAnalytics') || {},
              geoClusters: this.normalizeClusters(extra.geoClusters),
              recentOrders: this.normalizeRecentOrders(extra.recentOrders),
              errors,
            };

            this.metrics.validateReconciliation(result);
            this.cacheKey = key;
            this.cache = result;
            return result;
          })
        )
      )
    );
  }

  exportCsv(result: AnalyticsLoadResult, filters: AnalyticsFilterState): void {
    const reconciliation = this.metrics.validateReconciliation(result);
    const rows: string[][] = [
      ['Metric', 'Value'],
      ['Period', `${filters.startDate} to ${filters.endDate}`],
      ['Total Orders', String(result.dashboard.totalOrders ?? 0)],
      ['Delivered Orders', String(result.dashboard.totalDeliveredOrders ?? 0)],
      ['Cancelled Orders', String(result.dashboard.totalCanceledOrders ?? 0)],
      ['Gross Revenue', String(result.dashboard.totalRevenue ?? 0)],
      ['Users Online', String(result.dashboard.totalOnlineUsers ?? 0)],
      ['Platform Fees', String(result.earnings.totalEarnings?.platformFees ?? 0)],
      ['GST', String(result.earnings.totalEarnings?.gstAmount ?? 0)],
      ['Admin Earnings', String(result.earnings.totalEarnings?.adminEarnings ?? 0)],
      ['Reconciliation Passed', String(reconciliation.passed)],
    ];
    downloadCsv(
      `dropeat-analytics-${filters.startDate}-${filters.endDate}.csv`,
      rows
    );
  }

  computeDelta(current: number, previous: number): number | null {
    return this.metrics.computeDelta(current, previous);
  }

  private mapSummaryToResult(summary: any, filters: AnalyticsFilterState): AnalyticsLoadResult {
    const kpis = summary?.kpis || {};
    const previousKpis = summary?.previousKpis || {};
    const dashboard = {
      totalOrders: kpis.totalOrders,
      totalDeliveredOrders: kpis.totalDeliveredOrders,
      totalCanceledOrders: kpis.totalCanceledOrders,
      totalUsers: kpis.totalUsers,
      totalOnlineUsers: kpis.totalOnlineUsers,
      totalPartners: kpis.totalPartners,
      totalDeliveryBoys: kpis.totalDeliveryBoys,
      totalRevenue: kpis.totalRevenue,
    };
    const previousDashboard = {
      totalOrders: previousKpis.totalOrders,
      totalDeliveredOrders: previousKpis.totalDeliveredOrders,
      totalCanceledOrders: previousKpis.totalCanceledOrders,
      totalUsers: previousKpis.totalUsers,
      totalOnlineUsers: previousKpis.totalOnlineUsers,
      totalPartners: previousKpis.totalPartners,
      totalDeliveryBoys: previousKpis.totalDeliveryBoys,
      totalRevenue: previousKpis.totalRevenue,
    };

    return {
      dashboard,
      previousDashboard,
      earnings: summary?.earnings || {
        totalEarnings: {
          platformFees: kpis.platformFees,
          gstAmount: kpis.gstAmount,
          adminEarnings: kpis.adminEarnings,
        },
        chartData: summary?.earnings?.chartData || [],
      },
      previousEarnings: {
        totalEarnings: {
          platformFees: previousKpis.platformFees,
          gstAmount: previousKpis.gstAmount,
          adminEarnings: previousKpis.adminEarnings,
        },
      },
      settlementAnalytics: {},
      orderChart: summary?.charts?.orders || { labels: [], data: [] },
      revenueChart: this.normalizeRevenueChart(summary?.charts?.revenue),
      statusBreakdown: summary?.statusBreakdown || null,
      earningsBreakdown: {},
      topPartners: [],
      topDishes: [],
      customerActivity: [],
      ratings: {},
      settlementsPending: 0,
      settlementsSettled: 0,
      geoClusters: [],
      recentOrders: [],
      reconciliation: summary?.reconciliation,
      errors: {},
    };
  }

  private getAnalyticsSummary(filters: AnalyticsFilterState): Observable<any> {
    const url =
      `${environment.URL}admin/analytics/summary?startDate=${filters.startDate}` +
      `&endDate=${filters.endDate}&granularity=${filters.granularity}&includePrevious=true`;
    return new Observable((observer) => {
      this.headers().then((h) => {
        this.http.get<any>(url, { headers: h }).subscribe({
          next: (v) => {
            if (v?.data) {
              observer.next(v.data);
            } else {
              observer.error(v);
            }
            observer.complete();
          },
          error: (e) => {
            observer.error(e);
            observer.complete();
          },
        });
      });
    });
  }

  private async headers(): Promise<HttpHeaders> {
    const token = await this.storage.get('accessToken');
    return new HttpHeaders({ 'x-access-token': token || '' });
  }

  private safeGet<T>(url: string): Observable<T | { error: any }> {
    return new Observable((observer) => {
      this.headers().then((h) => {
        this.http.get<any>(url, { headers: h }).subscribe({
          next: (v) => {
            observer.next(v);
            observer.complete();
          },
          error: (e) => {
            observer.next({ error: e });
            observer.complete();
          },
        });
      });
    });
  }

  private getEarningsBreakdown(startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}analytics/admin-earnings-breakdown?startDate=${startDate}&endDate=${endDate}`
    );
  }

  private getTopPartners(startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}admin/analytics/top-partners?startDate=${startDate}&endDate=${endDate}&limit=10`
    );
  }

  private getMostSellingProducts(startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}admin/most-selling-products?startDate=${startDate}&endDate=${endDate}`
    );
  }

  private getCustomerMapChartData(sort: string, startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}admin/get/customerMapChartData?sort=${sort}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  private getRatingStatistics(startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}admin/ratings/statistics?startDate=${startDate}&endDate=${endDate}`
    );
  }

  private getPartnerSettlements(isSettled: boolean, startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}partner-settlement/partner-settlements?isSettled=${isSettled}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  private getSettlementAnalytics(startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}partner-settlement/partner-settlements/analytics?startDate=${startDate}&endDate=${endDate}`
    );
  }

  private getUserLocationClusters() {
    return this.safeGet(`${environment.URL}admin/get/user-location-cluster`);
  }

  private getRecentOrders(startDate: string, endDate: string) {
    return this.safeGet(
      `${environment.URL}admin/get/populated-order?startDate=${startDate}&endDate=${endDate}&limit=5`
    );
  }

  private normalizeRevenueChart(raw: any): ChartSeriesPayload {
    if (!raw) return { labels: [], data: [] };
    return { labels: raw.label || raw.labels || [], data: raw.data || [] };
  }

  private countSettlements(raw: any): number {
    const data = raw?.data ?? (raw?.error ? 0 : raw);
    if (Array.isArray(data)) return data.length;
    if (raw?.data && Array.isArray(raw.data)) return raw.data.length;
    return 0;
  }

  private normalizeClusters(raw: any): { lat: number; lng: number; count: number }[] {
    const data = raw?.data ?? (Array.isArray(raw) ? raw : []);
    return (data || []).slice(0, 200);
  }

  private normalizeRecentOrders(raw: any): any[] {
    const data = raw?.data ?? raw;
    return Array.isArray(data) ? data.slice(0, 5) : [];
  }

  private cacheKeyFor(filters: AnalyticsFilterState): string {
    return JSON.stringify(filters);
  }

  private cacheHasWidgets(result: AnalyticsLoadResult): boolean {
    return (result.topPartners?.length ?? 0) > 0 || Object.keys(result.earningsBreakdown || {}).length > 0;
  }
}
