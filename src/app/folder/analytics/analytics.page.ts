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
import { environment } from 'src/environments/environment';
import { DASHBOARD_DEFAULT_PRESET } from 'src/app/constants/analytics.constants';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AnalyticsMetricsService } from 'src/app/services/analytics-metrics.service';
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

  filters: AnalyticsFilterState = this.analytics.buildFilterFromPreset(DASHBOARD_DEFAULT_PRESET);
  data: AnalyticsLoadResult | null = null;
  kpis: KpiMetric[] = [];
  loading = false;
  periodLabel = '';
  reconciliationPassed: boolean | null = null;
  showReconciliation = !environment.production;
  private charts = new Map<string, Chart>();
  private viewReady = false;

  constructor(
    private analytics: AnalyticsService,
    private metrics: AnalyticsMetricsService,
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
        this.periodLabel = this.metrics.formatPeriodLabel(this.filters);
        this.kpis = this.metrics.buildKpis(result);
        const reconciliation = this.metrics.validateReconciliation(result);
        this.reconciliationPassed = reconciliation.passed;
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
    return this.metrics.deltaClass(delta);
  }

  deltaLabel(delta: number | null | undefined): string {
    return this.metrics.deltaLabel(delta);
  }

  hasError(field: string): boolean {
    return !!this.data?.errors?.[field];
  }

  get errorEntries(): { key: string; value: string }[] {
    if (!this.data?.errors) return [];
    return Object.entries(this.data.errors).map(([key, value]) => ({ key, value }));
  }

  openOrder(order: any): void {
    if (order?._id) {
      this.router.navigate(['folder', 'orders', 'view', order._id]);
    }
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
