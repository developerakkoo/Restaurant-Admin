import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);

dayjs.extend(weekday);
dayjs.extend(isoWeek);

interface PlatformFeesData {
  _id: string;
  total: number;
}

interface GstData {
  _id: string;
  total: number;
}

interface AdminEarningsData {
  _id: string;
  total: number;
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  chart: any;
  chartOrder: any;

  revenueChartData: any;
  selectedRevenueSort = 'dayOfMonth';
  revenueChartLables: any;
  orderChartData: any;
  selectedOrderSort = 'day';
  orderChartLables: any;

  totalOrders: number = 0;
  totalDeliveredOrders: any;
  totalCanceledOrders: any;
  totalUsers: any;
  totalPartners: number = 0;
  totalDeliveryBoys: any;
  totalRevenue: number = 0;
  totalOnlineUsers: number = 0;
  recentActivities: any[] = [
  ];

  profitChart:any;
  profitAnalytics: any[] = [];
  platformFeesChart:any;
  gstAmountChart:any;
  adminEarningsChart:any;
  earningsBreakdown: any[] = [];
  startDate: any = "";
  endDate: any = "";

  platformFeesData: PlatformFeesData[] = [];
  gstData: GstData[] = [];
  adminEarningsData: AdminEarningsData[] = [];

  subscriptions: Subscription[] = [];
  constructor(private auth: AuthService,
              private loadingController: LoadingController,
              private modalController: ModalController,
              private router:Router,
              private menuController: MenuController,
              private http: HttpService
  ) { }

  ngOnInit() {
    // Initialization logic can be added here if needed
    console.log('DashPage initialized');
    this.menuController.enable(true);
  }

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading data...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      this.getDashboardData('month', '', '');
      this.getRevenueChartData('dayOfMonth');
      this.getOrderChartData();
      this.getRecentOrders();
      this.getProfitAnalytics();
      this.getEarningsBreakdown();
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      await loading.dismiss();
    }
  }
  ionViewWillLeave() {
    // Cleanup logic can be added here if needed
    console.log('DashPage will leave');
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.chartOrder) {
      this.chartOrder.destroy();
    }

    if(this.subscriptions){
      this.subscriptions.forEach((sub) =>{
        sub.unsubscribe();
      })
    }
  }


  createChartTotalRevenue(labels: any = [], data: any = []) {

    if(this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart("MyRevenueChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,

        datasets: [{
          label:"Revenue",
          data:data
        }]
      },
      options: {
        
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }

 

  createOrderChart(labels: any = [], data: any = []) {
    if(this.chartOrder){
      this.chartOrder.destroy();
    }
    this.chartOrder = new Chart('MyChartOrder', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Orders',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {

        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

 

  onFilterChange(event: any) {
    const filter = event.detail.value;
    this.getDashboardData(filter,'','');
    // this.getRevenueChartData(filter);
    // this.getOrderChartData(filter);
  }

  onSortChange(event: any) {
    const days = event.detail.value;
    this.getRevenueChartData(days);
    // this.loadRevenueChart(days); // Refetch or re-draw chart
  }

  onOrderSortChange(event: any) {
    const days = event.detail.value;
    this.getOrderChartData(days);
    // this.loadOrderChart(days); // Refetch or re-draw chart
  }

  getProfitAnalytics(){
  this.http.getProfitAnalytics().subscribe({
    next: (value: any) => {
      console.log('Profit analytics:');

      console.log(value);
      this.profitAnalytics = value['data']['chartData'];
      //console.log(this.profitAnalytics);
      this.loadChart('daily');
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error fetching profit analytics:', error);
    },
  });
  }
  onRangeChange(event: any) {
    const view = event.detail.value;
    this.loadChart(view);
  }
  loadChart(viewType: 'daily' | 'monthly' | 'yearly') {
    // const canvas = document.getElementById('earningsChart') as HTMLCanvasElement;

  if (this.profitChart) {
    this.profitChart.destroy();
    
  }
    

    let labels: string[] = [];
    let platformFeesData: number[] = [];
    let gstAmountData: number[] = [];

    if (viewType === 'daily') {
      // Group by weekdays
      const weekData: { [key: string]: { platformFees: number; gstAmount: number } } = {};

      this.profitAnalytics.forEach(item => {
        const weekdayName = dayjs(item.date).format('ddd'); // 'Mon', 'Tue'
        if (!weekData[weekdayName]) {
          weekData[weekdayName] = { platformFees: 0, gstAmount: 0 };
        }
        weekData[weekdayName].platformFees += item.platformFees;
        weekData[weekdayName].gstAmount += item.gstAmount;
      });

      // Order weekdays properly (Sun - Sat)
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      labels = weekdays;
      platformFeesData = labels.map(day => weekData[day]?.platformFees || 0);
      gstAmountData = labels.map(day => weekData[day]?.gstAmount || 0);

    } else if (viewType === 'monthly') {
      const monthData: { [key: string]: { platformFees: number; gstAmount: number } } = {};

      this.profitAnalytics.forEach(item => {
        const monthName = dayjs(item.date).format('MMMM'); // 'April', 'May'
        if (!monthData[monthName]) {
          monthData[monthName] = { platformFees: 0, gstAmount: 0 };
        }
        monthData[monthName].platformFees += item.platformFees;
        monthData[monthName].gstAmount += item.gstAmount;
      });

      // Order months properly
      const months = dayjs.months(); // ['January', 'February', ..., 'December']
      labels = months;
      platformFeesData = labels.map(month => monthData[month]?.platformFees || 0);
      gstAmountData = labels.map(month => monthData[month]?.gstAmount || 0);

    } else if (viewType === 'yearly') {
      const yearData: { [key: string]: { platformFees: number; gstAmount: number } } = {};

      this.profitAnalytics.forEach(item => {
        const year = dayjs(item.date).format('YYYY');
        if (!yearData[year]) {
          yearData[year] = { platformFees: 0, gstAmount: 0 };
        }
        yearData[year].platformFees += item.platformFees;
        yearData[year].gstAmount += item.gstAmount;
      });

      labels = Object.keys(yearData).sort(); // sorted years
      platformFeesData = labels.map(year => yearData[year]?.platformFees || 0);
      gstAmountData = labels.map(year => yearData[year]?.gstAmount || 0);
    }


    this.profitChart = new Chart('earningsChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Platform Fees',
            data: platformFeesData,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
          },
          {
            label: 'GST Amount',
            data: gstAmountData,
            backgroundColor: 'rgba(255, 159, 64, 0.8)',
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 800,
          easing: 'easeOutBounce'
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount in ₹'
            }
          }
        }
      }
    });
}
  getEarningsBreakdown(){
    this.http.getEarningsBreakdown().subscribe({
      next: (value: any) => {
        console.log('Earnings breakdown:');
        console.log(value);
       
        
      
        this.platformFeesData = value['data']['platformFeesByPaymentMode'];
        this.gstData = value['data']['gstByPaymentMode'];
        this.adminEarningsData = value['data']['adminEarningsByHotel'];
        this.createPlatformFeesChart();
    this.createGstChart();
    this.createAdminEarningsChart();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching earnings breakdown:', error);
      },
    });
  }


  createPlatformFeesChart() {
    this.platformFeesChart = new Chart('platformFeesChart', {
      type: 'doughnut',
      data: {
        labels: this.platformFeesData.map(item => item._id),
        datasets: [{
          data: this.platformFeesData.map(item => item.total),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }


  createGstChart() {
    this.gstAmountChart = new Chart('gstAmountChart', {
      type: 'bar',
      data: {
        labels: this.gstData.map(item => item._id),
        datasets: [{
          label: 'GST Amount',
          data: this.gstData.map(item => item.total),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createAdminEarningsChart() {
    this.adminEarningsChart = new Chart('adminEarningsChart', {
      type: 'bar',
      data: {
        labels: this.adminEarningsData.map(item => item._id),
        datasets: [{
          label: 'Admin Earnings',
          data: this.adminEarningsData.map(item => item.total),
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y', // make it horizontal bar
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getDashboardData(filter: string, startDate: any = '', endDate: any = '') {
    let sub = this.auth.getDashboardData(filter, startDate, endDate).subscribe({
      next: (data: any) => {
        console.log('Dashboard data:', data['data']['totalDeliveredOrders']);
        this.totalOrders = data['data']['totalOrders'];
        this.totalDeliveredOrders = data['data']['totalDeliveredOrders'];
        this.totalCanceledOrders = data['data']['totalCanceledOrders'];
        this.totalUsers = data['data']['totalUsers'];
        this.totalDeliveryBoys = data['data']['totalDeliveryBoys'];
        this.totalCanceledOrders = data['data']['totalCanceledOrders'];
        this.totalRevenue = data['data']['totalRevenue'];
        this.totalOnlineUsers = data['data']['totalOnlineUsers'];
        this.totalPartners = data['data']['totalPartners'];
        this.totalDeliveryBoys = data['data']['totalDeliveryBoys'];
        this.recentActivities = data.recentActivities || [];
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      },
    });

    this.subscriptions.push(sub);
  }

  getRevenueChartData(filter: string) {
    let sub = this.auth.getRevenueChartData(filter).subscribe({
      next: (value: any) => {
        console.log('Revenue chart data:', value);
        console.log('Revenue chart data:', value['data']['data']);
        console.log('Revenue chart data:', value['data']['label']);
        
        this.revenueChartData = value['data']['data'];
        this.revenueChartLables = value['data']['label'];
        this.createChartTotalRevenue(value['data']['label'], value['data']['data']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching revenue chart data:', error);
      },
    });

    this.subscriptions.push(sub);
  }

  getOrderChartData(filter: string = 'day') {
    let sub = this.auth.getOrderChartData(filter).subscribe({
      next: (value: any) => {
        console.log('Order chart data:', value);
        console.log('Order chart data:', value['data']['data']);
        console.log('Order chart data:', value['data']['labels']);
        this.orderChartData = value['data']['data'];
        this.orderChartLables = value['data']['label'];
        this.createOrderChart(value['data']['labels'], value['data']['data']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching order chart data:', error);
      },
    });
    this.subscriptions.push(sub);
  }

  getRecentOrders() {
    let sub = this.auth.getPopulatedOrder()
      .subscribe({
        next: async(value: any) => {
          console.log(value);
          this.recentActivities = value['data'];
          this.recentActivities = this.recentActivities.slice(0, 3);
        },
        error: async(error: HttpErrorResponse) => {
          console.log(error.error);
        }
      });
    this.subscriptions.push(sub);
  }

  setDateEvent(event: any, type: any) {
    console.log(event.detail.value);
    console.log(type);

    let date = event.detail.value;
    if (type === "s") {
      console.log("Set Start Date");
      this.startDate = date;
    } else if (type === "e") {
      console.log("Set End Date");
      this.endDate = date;
    }
    if (!this.startDate || !this.endDate) {
      console.log("Both start and end dates must be set before fetching data.");
      return;
    }

    console.log(this.startDate);
    console.log(this.endDate);
    this.getDashboardData('', this.startDate, this.endDate);
    this.getRevenueChartData('dayOfMonth');
    this.getOrderChartData();
  }

  viewNotifications() {
    console.log('View notifications clicked');
    this.router.navigate(['folder','notifications']);
  }

  viewMessages() {
    console.log('View messages clicked');
    this.router.navigate(['folder','messages']);
  }
}