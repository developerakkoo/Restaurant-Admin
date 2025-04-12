import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  chart: any;
  chartOrder: any;
  revenueChart: any;

  revenueChartData: any;
  revenueChartLables: any;
  orderChartData: any;
  orderChartLables: any;

  totalOrders: number = 0;
  totalDeliveredOrders: any;
  totalCanceledOrders: any;
  totalUsers: any;
  totalPartners: number = 0;
  totalDeliveryBoys: any;
  totalRevenue: number = 0;
  totalOnlineUsers: number = 0;
  recentActivities: { description: string; timestamp: string }[] = [
    { description: 'Order #1234 placed by John Doe', timestamp: '2025-04-10 14:30' },
    { description: 'Order #1235 delivered to Jane Smith', timestamp: '2025-04-10 15:00' },
    { description: 'New partner registration: Gourmet Kitchen', timestamp: '2025-04-09 10:00' },
    { description: 'Driver Alex completed 50 deliveries', timestamp: '2025-04-08 18:45' },
    { description: 'Promo code SPRING2025 created', timestamp: '2025-04-07 12:00' }
  ];

  startDate: any = "";
  endDate: any = "";
  constructor(private auth: AuthService) { }

  ngOnInit() {
    // Initialization logic can be added here if needed
    console.log('DashPage initialized');
  }

  ionViewDidEnter() {
    this.getDashboardData();
    this.getRevenueChartData();
    this.getOrderChartData();
    this.createOrderChart();
    this.createRevenueChart();
  }
  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['users', 'partners', 'delivery boys',
        ],
        datasets: [{
          data: [this.totalUsers, this.totalPartners, this.totalDeliveryBoys]
        }]
      },
      options: {
        aspectRatio: 1 / 2,
        responsive: true,
        maintainAspectRatio: true
      }

    });
  }


  createChartTotalRevenue() {

    this.chart = new Chart("MyRevenueChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.revenueChartLables,

        datasets: [{
          data: this.revenueChartData
        }]
      },
      options: {
        aspectRatio: 1 / 2,
        responsive: true,
        maintainAspectRatio: true
      }

    });
  }

  createChartTotalOrders() {

    this.chart = new Chart("MyChartOrder", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.orderChartLables,

        datasets: [{
          data: this.orderChartData
        }]
      },
      options: {
        aspectRatio: 1 / 2,
        responsive: true,
        maintainAspectRatio: true
      }

    });
  }

  createOrderChart() {
    this.chartOrder = new Chart('MyChartOrder', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Orders',
            data: [10, 20, 30, 40, 50],
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

  createRevenueChart() {
    this.revenueChart = new Chart('MyRevenueChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Revenue',
            data: [500, 1000, 1500, 2000, 2500],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
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
    this.getDashboardData(filter);
    this.getRevenueChartData(filter);
    this.getOrderChartData(filter);
  }

  getDashboardData(filter: string = 'month') {
    this.auth.getDashboardData(filter, this.startDate, this.endDate).subscribe({
      next: (data: any) => {
        this.totalOrders = data.totalOrders;
        this.totalRevenue = data.totalRevenue;
        this.totalOnlineUsers = data.totalOnlineUsers;
        this.totalPartners = data.totalPartners;
        this.recentActivities = data.recentActivities || [];
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      },
    });
  }

  getRevenueChartData(filter: string = 'month') {
    this.auth.getRevenueChartData(filter).subscribe({
      next: (value: any) => {
        this.revenueChartData = value['data']['data'];
        this.revenueChartLables = value['data']['label'];
        this.createChartTotalRevenue();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching revenue chart data:', error);
      },
    });
  }

  getOrderChartData(filter: string = 'dayOfMonth') {
    this.auth.getOrderChartData(filter).subscribe({
      next: (value: any) => {
        this.orderChartData = value['data']['data'];
        this.orderChartLables = value['data']['label'];
        this.createChartTotalOrders();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching order chart data:', error);
      },
    });
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


    console.log(this.startDate);
    console.log(this.endDate);
    this.getDashboardData()

    this.getRevenueChartData();
    this.getOrderChartData();

  }
  viewNotifications() {
    console.log('View notifications clicked');
  }

  viewMessages() {
    console.log('View messages clicked');
  }
}
