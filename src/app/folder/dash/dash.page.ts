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
import { AnalyticsService } from 'src/app/services/analytics.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements AfterViewInit, OnDestroy {
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersCanvas') ordersCanvas!: ElementRef<HTMLCanvasElement>;

  totalOrders = 0;
  totalDeliveredOrders = 0;
  totalRevenue = 0;
  totalOnlineUsers = 0;
  totalPartners = 0;
  totalDeliveryBoys = 0;
  recentActivities: any[] = [];

  private revenueChart: Chart | null = null;
  private ordersChart: Chart | null = null;

  constructor(
    private analytics: AnalyticsService,
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

  private async loadSnapshot(): Promise<void> {
    const filters = this.analytics.buildFilterFromPreset('30d');
    const loader = await this.loadingCtrl.create({ message: 'Loading...', spinner: 'crescent' });
    await loader.present();

    this.analytics.loadAll(filters).subscribe({
      next: (r) => {
        const d = r.dashboard;
        this.totalOrders = d.totalOrders || 0;
        this.totalDeliveredOrders = d.totalDeliveredOrders || 0;
        this.totalRevenue = d.totalRevenue || 0;
        this.totalOnlineUsers = d.totalOnlineUsers || 0;
        this.totalPartners = d.totalPartners || 0;
        this.totalDeliveryBoys = d.totalDeliveryBoys || 0;
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
        loader.dismiss();
      },
      error: () => loader.dismiss(),
    });
  }

  viewNotifications(): void {
    this.router.navigate(['folder', 'notifications']);
  }

  viewMessages(): void {
    this.router.navigate(['folder', 'messages']);
  }
}
