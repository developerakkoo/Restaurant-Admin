import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import * as dayjs from 'dayjs';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';
import {
  AnalyticsFilterState,
  AnalyticsLoadResult,
  AnalyticsPreset,
  KpiMetric,
} from 'src/app/models/analytics.models';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements AfterViewInit, OnDestroy {
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersCanvas') ordersCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('statusCanvas') statusCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cancelCanvas') cancelCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('platformFeesCanvas') platformFeesCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gstCanvas') gstCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('profitCanvas') profitCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('topPartnersCanvas') topPartnersCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('topDishesCanvas') topDishesCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('customerCanvas') customerCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ratingsCanvas') ratingsCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('settlementsCanvas') settlementsCanvas!: ElementRef<HTMLCanvasElement>;

  filters: AnalyticsFilterState = this.analytics.buildFilterFromPreset('30d');
  data: AnalyticsLoadResult | null = null;
  kpis: KpiMetric[] = [];
  loading = false;
  private charts = new Map<string, Chart>();
  private viewReady = false;

  constructor(
    private analytics: AnalyticsService,
    private chartTheme: ChartThemeService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.viewReady = true;
    void this.refresh();
  }

  ngOnDestroy(): void {
    this.destroyAllCharts();
  }

  ionViewWillLeave(): void {
    this.destroyAllCharts();
  }

  applyPreset(preset: AnalyticsPreset): void {
    this.filters = this.analytics.buildFilterFromPreset(preset);
    void this.refresh(true);
  }

  onCustomDate(): void {
    this.filters.preset = 'custom';
  }

  async refresh(force = false): Promise<void> {
    if (!this.viewReady) return;
    this.loading = true;
    const loader = await this.loadingCtrl.create({ message: 'Loading analytics...', spinner: 'crescent' });
    await loader.present();

    this.analytics.loadAll(this.filters, force).subscribe({
      next: (result) => {
        this.data = result;
        this.kpis = this.buildKpis(result);
        this.loading = false;
        loader.dismiss();
        setTimeout(() => this.renderAllCharts(), 50);
      },
      error: () => {
        this.loading = false;
        loader.dismiss();
      },
    });
  }

  exportCsv(): void {
    if (this.data) {
      this.analytics.exportCsv(this.data, this.filters);
    }
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

  openOrder(order: any): void {
    if (order?._id) {
      this.router.navigate(['folder', 'orders', 'view', order._id]);
    }
  }

  private buildKpis(r: AnalyticsLoadResult): KpiMetric[] {
    const d = r.dashboard;
    const pd = r.previousDashboard;
    const e = r.earnings?.totalEarnings || {};
    const pe = r.previousEarnings?.totalEarnings || {};
    const cancelled =
      r.statusBreakdown?.cancellations?.reduce((s, c) => s + c.count, 0) ??
      d.totalCanceledOrders ??
      0;

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
      deltaPercent: this.analytics.computeDelta(value || 0, prev || 0),
      format,
      icon,
      iconClass,
    });

    return [
      mk('orders', 'Total Orders', d.totalOrders, pd.totalOrders, 'number', 'cart-outline', 'de-stat__icon--red'),
      mk('delivered', 'Delivered', d.totalDeliveredOrders, pd.totalDeliveredOrders, 'number', 'checkmark-done-outline', 'de-stat__icon--green'),
      mk('cancelled', 'Cancelled', cancelled, 0, 'number', 'close-circle-outline', 'de-stat__icon--purple'),
      mk('revenue', 'Gross Revenue', d.totalRevenue, pd.totalRevenue, 'currency', 'cash-outline', 'de-stat__icon--green'),
      mk('platform', 'Platform Fees', e.platformFees, pe.platformFees, 'currency', 'pie-chart-outline', 'de-stat__icon--blue'),
      mk('gst', 'GST Collected', e.gstAmount, pe.gstAmount, 'currency', 'receipt-outline', 'de-stat__icon--purple'),
      mk('admin', 'Admin Earnings', e.adminEarnings || r.settlementAnalytics?.totalAdminEarnings, pe.adminEarnings, 'currency', 'trending-up-outline', 'de-stat__icon--red'),
      mk('online', 'Users Online', d.totalOnlineUsers, pd.totalOnlineUsers, 'number', 'people-outline', 'de-stat__icon--blue'),
    ];
  }

  private renderAllCharts(): void {
    if (!this.data) return;
    this.destroyAllCharts();

    const r = this.data;
    this.setChart('revenue', this.chartTheme.lineChart(
      this.revenueCanvas.nativeElement,
      r.revenueChart.labels,
      r.revenueChart.data,
      'Revenue'
    ));
    this.setChart('orders', this.chartTheme.barChart(
      this.ordersCanvas.nativeElement,
      r.orderChart.labels,
      r.orderChart.data,
      'Orders'
    ));

    const status = r.statusBreakdown?.byStatus || [];
    this.setChart('status', this.chartTheme.doughnutChart(
      this.statusCanvas.nativeElement,
      status.map((s) => s.label),
      status.map((s) => s.count)
    ));
    const cancels = r.statusBreakdown?.cancellations || [];
    this.setChart('cancel', this.chartTheme.barChart(
      this.cancelCanvas.nativeElement,
      cancels.map((c) => c.label),
      cancels.map((c) => c.count),
      'Cancellations'
    ));

    const breakdown = r.earningsBreakdown || {};
    const pf = breakdown.platformFeesByPaymentMode || [];
    this.setChart('platformFees', this.chartTheme.doughnutChart(
      this.platformFeesCanvas.nativeElement,
      pf.map((x: any) => x._id || 'Unknown'),
      pf.map((x: any) => x.total)
    ));
    const gst = breakdown.gstByPaymentMode || [];
    this.setChart('gst', this.chartTheme.barChart(
      this.gstCanvas.nativeElement,
      gst.map((x: any) => x._id || 'Unknown'),
      gst.map((x: any) => x.total),
      'GST'
    ));

    const chartData = r.earnings?.chartData || [];
    const profitLabels = chartData.map((x: any) => dayjs(x.date).format('DD MMM'));
    this.setChart('profit', this.chartTheme.stackedBarChart(
      this.profitCanvas.nativeElement,
      profitLabels,
      [
        { label: 'Platform Fees', data: chartData.map((x: any) => x.platformFees), color: 'rgba(75, 192, 192, 0.8)' },
        { label: 'GST', data: chartData.map((x: any) => x.gstAmount), color: 'rgba(255, 159, 64, 0.8)' },
        { label: 'Admin Earnings', data: chartData.map((x: any) => x.adminEarnings), color: 'rgba(153, 102, 255, 0.8)' },
      ]
    ));

    const partners = r.topPartners || [];
    this.setChart('topPartners', this.chartTheme.horizontalBarChart(
      this.topPartnersCanvas.nativeElement,
      partners.map((p) => p.hotelName),
      partners.map((p) => p.revenue),
      'Revenue'
    ));
    const dishes = r.topDishes || [];
    this.setChart('topDishes', this.chartTheme.horizontalBarChart(
      this.topDishesCanvas.nativeElement,
      dishes.map((d: any) => d.dish?.name || d.dish?.dishName || 'Dish'),
      dishes.map((d: any) => d.totalOrders),
      'Qty sold'
    ));

    const activity = r.customerActivity || [];
    this.setChart('customer', this.chartTheme.lineChart(
      this.customerCanvas.nativeElement,
      activity.map((a: any) => String(a.month || a.day || a.year || '')),
      activity.map((a: any) => a.userCount),
      'Activity'
    ));

    const ratings = r.ratings || {};
    this.setChart('ratings', this.chartTheme.barChart(
      this.ratingsCanvas.nativeElement,
      ['Food', 'Delivery', 'Restaurant'],
      [ratings.avgFoodRating || 0, ratings.avgDeliveryRating || 0, ratings.avgRestaurantRating || 0],
      'Avg rating'
    ));

    this.setChart('settlements', this.chartTheme.doughnutChart(
      this.settlementsCanvas.nativeElement,
      ['Pending', 'Settled'],
      [r.settlementsPending, r.settlementsSettled]
    ));
  }

  private setChart(key: string, chart: Chart): void {
    this.charts.set(key, chart);
  }

  private destroyAllCharts(): void {
    this.charts.forEach((c) => this.chartTheme.destroy(c));
    this.charts.clear();
  }
}
