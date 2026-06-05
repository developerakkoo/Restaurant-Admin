import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AnalyticsFilterState,
  AnalyticsLoadResult,
  KpiMetric,
} from '../models/analytics.models';

@Injectable({ providedIn: 'root' })
export class AnalyticsMetricsService {
  computeDelta(current: number, previous: number): number | null {
    if (previous === 0) {
      return current > 0 ? 100 : null;
    }
    return Number((((current - previous) / previous) * 100).toFixed(1));
  }

  formatPeriodLabel(filters: AnalyticsFilterState): string {
    return `${filters.startDate} – ${filters.endDate}`;
  }

  buildKpis(result: AnalyticsLoadResult, options?: { dashboardOnly?: boolean }): KpiMetric[] {
    const d = result.dashboard || {};
    const pd = result.previousDashboard || {};
    const e = result.earnings?.totalEarnings || {};
    const pe = result.previousEarnings?.totalEarnings || {};

    const mk = (
      key: string,
      label: string,
      value: number,
      prev: number,
      format: 'number' | 'currency',
      icon: string,
      iconClass: string
    ): KpiMetric => ({
      key,
      label,
      value: value || 0,
      previousValue: prev,
      deltaPercent: this.computeDelta(value || 0, prev || 0),
      format,
      icon,
      iconClass,
    });

    const dashboardKpis = [
      mk('orders', 'Total Orders', d.totalOrders, pd.totalOrders, 'number', 'cart-outline', 'de-stat__icon--red'),
      mk('delivered', 'Delivered', d.totalDeliveredOrders, pd.totalDeliveredOrders, 'number', 'checkmark-done-outline', 'de-stat__icon--green'),
      mk('revenue', 'Gross Revenue', d.totalRevenue, pd.totalRevenue, 'currency', 'cash-outline', 'de-stat__icon--green'),
      mk('online', 'Users Online', d.totalOnlineUsers, pd.totalOnlineUsers, 'number', 'people-outline', 'de-stat__icon--blue'),
      mk('partners', 'Active Partners', d.totalPartners, pd.totalPartners, 'number', 'storefront-outline', 'de-stat__icon--purple'),
      mk('drivers', 'Active Drivers', d.totalDeliveryBoys, pd.totalDeliveryBoys, 'number', 'bicycle-outline', 'de-stat__icon--red'),
    ];

    if (options?.dashboardOnly) {
      return dashboardKpis.slice(0, 4);
    }

    return [
      ...dashboardKpis.slice(0, 2),
      mk(
        'cancelled',
        'Cancelled',
        d.totalCanceledOrders,
        pd.totalCanceledOrders,
        'number',
        'close-circle-outline',
        'de-stat__icon--purple'
      ),
      dashboardKpis[2],
      mk('platform', 'Platform Fees', e.platformFees, pe.platformFees, 'currency', 'pie-chart-outline', 'de-stat__icon--blue'),
      mk('gst', 'GST Collected', e.gstAmount, pe.gstAmount, 'currency', 'receipt-outline', 'de-stat__icon--purple'),
      mk('admin', 'Admin Earnings', e.adminEarnings, pe.adminEarnings, 'currency', 'trending-up-outline', 'de-stat__icon--red'),
      dashboardKpis[3],
    ];
  }

  validateReconciliation(result: AnalyticsLoadResult): {
    passed: boolean;
    ordersChartSum: number;
    revenueChartSum: number;
    statusSum: number;
    cancellationSum: number;
  } {
    if (result.reconciliation) {
      return result.reconciliation;
    }

    const d = result.dashboard || {};
    const ordersChartSum = (result.orderChart?.data || []).reduce((s, n) => s + n, 0);
    const revenueChartSum = Number(
      (result.revenueChart?.data || []).reduce((s, n) => s + n, 0).toFixed(2)
    );
    const statusSum = (result.statusBreakdown?.byStatus || []).reduce((s, row) => s + row.count, 0);
    const cancellationSum = (result.statusBreakdown?.cancellations || []).reduce(
      (s, row) => s + row.count,
      0
    );
    const revenueDiff = Math.abs(revenueChartSum - (d.totalRevenue || 0));
    const passed =
      ordersChartSum === (d.totalOrders || 0) &&
      revenueDiff <= 0.01 &&
      statusSum === (d.totalOrders || 0) &&
      cancellationSum === (d.totalCanceledOrders || 0);

    if (!environment.production && !passed) {
      console.warn('[Analytics] Reconciliation failed', {
        ordersChartSum,
        totalOrders: d.totalOrders,
        revenueChartSum,
        totalRevenue: d.totalRevenue,
        statusSum,
        cancellationSum,
        totalCanceledOrders: d.totalCanceledOrders,
      });
    }

    return { passed, ordersChartSum, revenueChartSum, statusSum, cancellationSum };
  }

  deltaClass(delta: number | null | undefined): string {
    if (delta == null) return 'de-stat__delta--flat';
    if (delta > 0) return 'de-stat__delta--up';
    if (delta < 0) return 'de-stat__delta--down';
    return 'de-stat__delta--flat';
  }

  deltaLabel(delta: number | null | undefined): string {
    if (delta == null) return '—';
    const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
    return `${arrow} ${Math.abs(delta)}% vs prior period`;
  }
}
