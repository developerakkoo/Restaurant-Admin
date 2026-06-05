import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
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

  constructor(private http: HttpClient, private storage: DataService) {}

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
      granularity: preset === 'ytd' ? 'month' : preset === '30d' || preset === 'mtd' ? 'day' : 'day',
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

  loadAll(filters: AnalyticsFilterState, force = false): Observable<AnalyticsLoadResult> {
    const key = JSON.stringify(filters);
    if (!force && this.cache && this.cacheKey === key) {
      return of(this.cache);
    }

    const prev = this.previousRange(filters);
    const iso = { startDate: filters.startDate, endDate: filters.endDate };
    const prevIso = { startDate: prev.startDate, endDate: prev.endDate };
    const dashSort = this.mapGranularityToDashboardSort(filters.granularity);

    return forkJoin({
      dashboard: this.getDashboardData(dashSort, filters.startDate, filters.endDate),
      previousDashboard: this.getDashboardData(dashSort, prev.startDate, prev.endDate),
      earnings: this.getAdminEarnings(iso.startDate, iso.endDate),
      previousEarnings: this.getAdminEarnings(prevIso.startDate, prevIso.endDate),
      settlementAnalytics: this.getSettlementAnalytics(),
      orderChart: this.getOrderChartData(filters.granularity, filters.startDate, filters.endDate),
      revenueChart: this.getRevenueChartData(filters.granularity, filters.startDate, filters.endDate),
      statusBreakdown: this.getOrderStatusBreakdown(iso.startDate, iso.endDate),
      earningsBreakdown: this.getEarningsBreakdown(iso.startDate, iso.endDate),
      topPartners: this.getTopPartners(iso.startDate, iso.endDate),
      topDishes: this.getMostSellingProducts(this.mapPeriodFromFilters(filters)),
      customerActivity: this.getCustomerMapChartData(filters.granularity === 'year' ? 'month' : filters.granularity),
      ratings: this.getRatingStatistics(iso.startDate, iso.endDate),
      settlementsPending: this.getPartnerSettlements(false),
      settlementsSettled: this.getPartnerSettlements(true),
      geoClusters: this.getUserLocationClusters(),
      recentOrders: this.getRecentOrders(),
    }).pipe(
      map((raw) => {
        const errors: Record<string, string> = {};
        const unwrap = (res: any, field: string) => {
          if (!res || res.error) {
            errors[field] = res?.error?.message || 'Failed to load';
            return null;
          }
          return res?.data ?? res;
        };

        const result: AnalyticsLoadResult = {
          dashboard: unwrap(raw.dashboard, 'dashboard') || {},
          previousDashboard: unwrap(raw.previousDashboard, 'previousDashboard') || {},
          earnings: unwrap(raw.earnings, 'earnings') || {},
          previousEarnings: unwrap(raw.previousEarnings, 'previousEarnings') || {},
          settlementAnalytics: unwrap(raw.settlementAnalytics, 'settlementAnalytics') || {},
          orderChart: unwrap(raw.orderChart, 'orderChart') || { labels: [], data: [] },
          revenueChart: this.normalizeRevenueChart(unwrap(raw.revenueChart, 'revenueChart')),
          statusBreakdown: unwrap(raw.statusBreakdown, 'statusBreakdown'),
          earningsBreakdown: unwrap(raw.earningsBreakdown, 'earningsBreakdown') || {},
          topPartners: (unwrap(raw.topPartners, 'topPartners') || []) as TopPartnerRow[],
          topDishes: unwrap(raw.topDishes, 'topDishes') || [],
          customerActivity: unwrap(raw.customerActivity, 'customerActivity') || [],
          ratings: unwrap(raw.ratings, 'ratings') || {},
          settlementsPending: this.countSettlements(raw.settlementsPending),
          settlementsSettled: this.countSettlements(raw.settlementsSettled),
          geoClusters: this.normalizeClusters(raw.geoClusters),
          recentOrders: this.normalizeRecentOrders(raw.recentOrders),
          errors,
        };

        this.cacheKey = key;
        this.cache = result;
        return result;
      })
    );
  }

  exportCsv(result: AnalyticsLoadResult, filters: AnalyticsFilterState): void {
    const rows: string[][] = [
      ['Metric', 'Value'],
      ['Period', `${filters.startDate} to ${filters.endDate}`],
      ['Total Orders', String(result.dashboard.totalOrders ?? 0)],
      ['Delivered Orders', String(result.dashboard.totalDeliveredOrders ?? 0)],
      ['Gross Revenue', String(result.dashboard.totalRevenue ?? 0)],
      ['Platform Fees', String(result.earnings.totalEarnings?.platformFees ?? 0)],
      ['GST', String(result.earnings.totalEarnings?.gstAmount ?? 0)],
      ['Admin Earnings', String(result.earnings.totalEarnings?.adminEarnings ?? 0)],
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dropeat-analytics-${filters.startDate}-${filters.endDate}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  private async headers(): Promise<HttpHeaders> {
    const token = await this.storage.get('accessToken');
    return new HttpHeaders({ 'x-access-token': token || '' });
  }

  private safeGet<T>(url: string, field: string): Observable<T | { error: any }> {
    return new Observable((observer) => {
      this.headers().then((h) => {
        this.http.get<any>(url, { headers: h }).subscribe({
          next: (v) => { observer.next(v); observer.complete(); },
          error: (e) => { observer.next({ error: e }); observer.complete(); },
        });
      });
    });
  }

  private toDashboardDate(iso: string): string {
    return dayjs(iso).format('DD-MM-YYYY');
  }

  private mapGranularityToDashboardSort(g: string): string {
    if (g === 'year') return 'year';
    if (g === 'month') return 'month';
    return 'day';
  }

  private mapPeriodFromFilters(f: AnalyticsFilterState): string {
    const days = dayjs(f.endDate).diff(dayjs(f.startDate), 'day');
    if (days <= 1) return 'daily';
    if (days <= 7) return 'weekly';
    return 'monthly';
  }

  getDashboardData(sort: string, startDate: string, endDate: string) {
    let url = `${environment.URL}admin/get/dashboard-data?sort=${sort}`;
    if (startDate) url += `&startDate=${this.toDashboardDate(startDate)}`;
    if (endDate) url += `&endDate=${this.toDashboardDate(endDate)}`;
    return this.safeGet(url, 'dashboard');
  }

  getOrderChartData(sort: string, startDate: string, endDate: string) {
    let url = `${environment.URL}admin/get/orderChartData?sort=${sort}&startDate=${startDate}&endDate=${endDate}`;
    return this.safeGet<ChartSeriesPayload>(url, 'orderChart');
  }

  getRevenueChartData(sort: string, startDate: string, endDate: string) {
    let url = `${environment.URL}admin/get/revenueChartData?sort=${sort}&startDate=${startDate}&endDate=${endDate}`;
    return this.safeGet(url, 'revenueChart');
  }

  getAdminEarnings(startDate: string, endDate: string) {
    const url = `${environment.URL}analytics/admin-earnings?startDate=${startDate}&endDate=${endDate}`;
    return this.safeGet(url, 'earnings');
  }

  getEarningsBreakdown(startDate: string, endDate: string) {
    const url = `${environment.URL}analytics/admin-earnings-breakdown?startDate=${startDate}&endDate=${endDate}`;
    return this.safeGet(url, 'earningsBreakdown');
  }

  getSettlementAnalytics() {
    return this.safeGet(`${environment.URL}partner-settlement/partner-settlements/analytics`, 'settlementAnalytics');
  }

  getOrderStatusBreakdown(startDate: string, endDate: string) {
    const url = `${environment.URL}admin/analytics/order-status-breakdown?startDate=${startDate}&endDate=${endDate}`;
    return this.safeGet<OrderStatusBreakdown>(url, 'statusBreakdown');
  }

  getTopPartners(startDate: string, endDate: string) {
    const url = `${environment.URL}admin/analytics/top-partners?startDate=${startDate}&endDate=${endDate}&limit=10`;
    return this.safeGet<TopPartnerRow[]>(url, 'topPartners');
  }

  getMostSellingProducts(period: string) {
    return this.safeGet(`${environment.URL}admin/most-selling-products?period=${period}`, 'topDishes');
  }

  getCustomerMapChartData(sort: string) {
    return this.safeGet(`${environment.URL}admin/get/customerMapChartData?sort=${sort}`, 'customerActivity');
  }

  getRatingStatistics(startDate: string, endDate: string) {
    const url = `${environment.URL}admin/ratings/statistics?startDate=${startDate}&endDate=${endDate}`;
    return this.safeGet(url, 'ratings');
  }

  getPartnerSettlements(isSettled: boolean) {
    return this.safeGet(`${environment.URL}partner-settlement/partner-settlements?isSettled=${isSettled}`, 'settlements');
  }

  getUserLocationClusters() {
    return this.safeGet(`${environment.URL}admin/get/user-location-cluster`, 'geoClusters');
  }

  getRecentOrders() {
    return this.safeGet(`${environment.URL}admin/get/populated-order`, 'recentOrders');
  }

  private normalizeRevenueChart(raw: any): ChartSeriesPayload {
    if (!raw) return { labels: [], data: [] };
    return { labels: raw.label || raw.labels || [], data: raw.data || [] };
  }

  private countSettlements(raw: any): number {
    const data = raw?.data ?? raw?.error ? 0 : raw;
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

  computeDelta(current: number, previous: number): number | null {
    if (previous === 0) return current > 0 ? 100 : null;
    return Number((((current - previous) / previous) * 100).toFixed(1));
  }
}
