export type AnalyticsGranularity = 'day' | 'month' | 'year';
export type AnalyticsPreset = 'today' | '7d' | '30d' | 'mtd' | 'ytd' | 'custom';

export interface AnalyticsFilterState {
  preset: AnalyticsPreset;
  startDate: string;
  endDate: string;
  granularity: AnalyticsGranularity;
}

export interface KpiMetric {
  key: string;
  label: string;
  value: number;
  previousValue?: number;
  deltaPercent?: number | null;
  format: 'number' | 'currency';
  icon: string;
  iconClass: string;
}

export interface ChartSeriesPayload {
  labels: string[];
  data: number[];
}

export interface OrderStatusBreakdown {
  byStatus: { status: number; count: number; label: string }[];
  cancellations: { status: number; count: number; label: string }[];
}

export interface TopPartnerRow {
  hotelId: string;
  hotelName: string;
  orderCount: number;
  revenue: number;
}

export interface AnalyticsLoadResult {
  dashboard: any;
  previousDashboard: any;
  earnings: any;
  previousEarnings: any;
  settlementAnalytics: any;
  orderChart: ChartSeriesPayload;
  revenueChart: ChartSeriesPayload;
  statusBreakdown: OrderStatusBreakdown | null;
  earningsBreakdown: any;
  topPartners: TopPartnerRow[];
  topDishes: any[];
  customerActivity: any[];
  ratings: any;
  settlementsPending: number;
  settlementsSettled: number;
  geoClusters: { lat: number; lng: number; count: number }[];
  recentOrders: any[];
  errors: Record<string, string>;
  reconciliation?: {
    passed: boolean;
    ordersChartSum: number;
    revenueChartSum: number;
    statusSum: number;
    cancellationSum: number;
  };
}
