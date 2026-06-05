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
import { DASHBOARD_DEFAULT_PRESET } from 'src/app/constants/analytics.constants';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AnalyticsMetricsService } from 'src/app/services/analytics-metrics.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';
import {
  AnalyticsFilterState,
  AnalyticsPreset,
  KpiMetric,
} from 'src/app/models/analytics.models';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements AfterViewInit, OnDestroy {
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersCanvas') ordersCanvas!: ElementRef<HTMLCanvasElement>;

  filters: AnalyticsFilterState = this.analytics.buildFilterFromPreset(DASHBOARD_DEFAULT_PRESET);
  kpis: KpiMetric[] = [];
  periodLabel = '';
  periodSubtitle = 'Last 30 days platform snapshot';
  recentActivities: any[] = [];
  loading = false;

  private revenueChart: Chart | null = null;
  private ordersChart: Chart | null = null;

  constructor(
    private analytics: AnalyticsService,
    private metrics: AnalyticsMetricsService,
    private chartTheme: ChartThemeService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    void this.loadSnapshot();
  }

  ngOnDestroy(): void {
    this.chartTheme.destroy(this.revenueChart);
    this.chartTheme.destroy(this.ordersChart);
  }

  ionViewWillLeave(): void {
    this.chartTheme.destroy(this.revenueChart);
    this.chartTheme.destroy(this.ordersChart);
    this.revenueChart = null;
    this.ordersChart = null;
  }

  applyPreset(preset: AnalyticsPreset): void {
    this.filters = this.analytics.buildFilterFromPreset(preset);
    this.periodSubtitle = this.subtitleForPreset(preset);
    void this.loadSnapshot(true);
  }

  private subtitleForPreset(preset: AnalyticsPreset): string {
    const labels: Record<AnalyticsPreset, string> = {
      today: "Today's platform snapshot",
      '7d': 'Last 7 days platform snapshot',
      '30d': 'Last 30 days platform snapshot',
      mtd: 'Month-to-date platform snapshot',
      ytd: 'Year-to-date platform snapshot',
      custom: 'Custom period platform snapshot',
    };
    return labels[preset] || labels['30d'];
  }

  kpiValue(kpi: KpiMetric): string | number {
    if (kpi.format === 'currency') {
      return kpi.value;
    }
    return kpi.value;
  }

  private async loadSnapshot(force = false): Promise<void> {
    this.loading = true;
    const loader = await this.loadingCtrl.create({ message: 'Loading...', spinner: 'crescent' });
    await loader.present();

    this.analytics.loadDashboardSnapshot(this.filters, force).subscribe({
      next: (r) => {
        this.periodLabel = this.metrics.formatPeriodLabel(this.filters);
        this.kpis = this.metrics.buildKpis(r, { dashboardOnly: true });
        this.recentActivities = r.recentOrders || [];

        this.chartTheme.destroy(this.revenueChart);
        this.chartTheme.destroy(this.ordersChart);
        this.revenueChart = this.chartTheme.lineChart(
          this.revenueCanvas.nativeElement,
          r.revenueChart.labels,
          r.revenueChart.data,
          'Revenue'
        );
        this.ordersChart = this.chartTheme.barChart(
          this.ordersCanvas.nativeElement,
          r.orderChart.labels,
          r.orderChart.data,
          'Orders'
        );
        this.loading = false;
        loader.dismiss();
      },
      error: () => {
        this.loading = false;
        loader.dismiss();
      },
    });
  }

  viewNotifications(): void {
    this.router.navigate(['folder', 'notifications']);
  }

  viewMessages(): void {
    this.router.navigate(['folder', 'messages']);
  }
}
