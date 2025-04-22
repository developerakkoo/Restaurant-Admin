import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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

  startDate: any = "";
  endDate: any = "";

  subscriptions: Subscription[] = [];
  constructor(private auth: AuthService,
              private loadingController: LoadingController,
              private modalController: ModalController,
              private router:Router
  ) { }

  ngOnInit() {
    // Initialization logic can be added here if needed
    console.log('DashPage initialized');
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


  getDashboardData(filter: string,startDate: any = '', endDate: any = '') {
   let sub =  this.auth.getDashboardData(filter, startDate, endDate).subscribe({
      next: (data: any) => {
        console.log('Dashboard data:', data['data']['totalDeliveredOrders']);
      //   {
      //     "totalOrders": 4,
      //     "totalDeliveredOrders": 1,
      //     "totalCanceledOrders": 0,
      //     "totalUsers": 3,
      //     "totalOnlineUsers": 0,
      //     "totalPartners": 1,
      //     "totalDeliveryBoys": 1,
      //     "totalRevenue": 2817
      // }
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
   let sub =  this.auth.getRevenueChartData(filter).subscribe({
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
  let sub =  this.auth.getOrderChartData(filter).subscribe({
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

  getRecentOrders(){
   let sub = this.auth.getPopulatedOrder()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.recentActivities = value['data'];
        this.recentActivities = this.recentActivities.slice(0, 3);
        //filter The Array For only unblocked Drivers
      },
      error:async(error:HttpErrorResponse) =>{
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

    this.getRevenueChartData('dayOfMonth',);
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
