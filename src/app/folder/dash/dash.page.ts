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
  chart:any;
  chartOrder:any;
  revenueChart:any;


  revenueChartData:any;
  revenueChartLables:any;
  orderChartData:any;
  orderChartLables:any;

  totalOrders:any;
  totalDeliveredOrders:any;
  totalCanceledOrders:any;
  totalUsers:any;
  totalPartners:any;
  totalDeliveryBoys:any;
  totalRevenue:any;
  constructor(private auth:AuthService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getDashboardData();
    this.getRevenueChartData();
    this.getOrderChartData();
  }
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart
      
      data: {// values on X-Axis
        labels: ['users', 'partners', 'delivery boys',
								 ], 
	       datasets: [{
         data:[this.totalUsers, this.totalPartners, this.totalDeliveryBoys]
      }]
      },
      options: {
        aspectRatio:1/2,
        responsive: true,
maintainAspectRatio: true
      }
      
    });
  }


  createChartTotalRevenue(){
  
    this.chart = new Chart("MyRevenueChart", {
      type: 'line', //this denotes tha type of chart
      
      data: {// values on X-Axis
        labels: this.revenueChartLables,
								  
	       datasets: [{
         data:this.revenueChartData
      }]
      },
      options: {
        aspectRatio:1/2,
        responsive: true,
maintainAspectRatio: true
      }
      
    });
  }

  createChartTotalOrders(){
  
    this.chart = new Chart("MyChartOrder", {
      type: 'line', //this denotes tha type of chart
      
      data: {// values on X-Axis
        labels: this.orderChartLables,
								  
	       datasets: [{
         data:this.orderChartData
      }]
      },
      options: {
        aspectRatio:1/2,
        responsive: true,
maintainAspectRatio: true
      }
      
    });
  }


  getDashboardData(){
    // dayOfMonth,week,year,month
    this.auth.getDashboardData("year")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
      //   {
      //     "totalOrders": 23,
      //     "totalDeliveredOrders": 6,
      //     "totalCanceledOrders": 3,
      //     "totalUsers": 21,
      //     "totalPartners": 16,
      //     "totalDeliveryBoys": 2,
      //     "totalRevenue": 11169.26
      // }

      this.totalOrders = value['data']['totalOrders'];
      this.totalDeliveredOrders = value['data']['totalDeliveredOrders'];
      this.totalUsers = value['data']['totalUsers'];
      this.totalPartners = value['data']['totalPartners'];
      this.totalRevenue = value['data']['totalRevenue'];
      this.totalDeliveryBoys = value['data']['totalDeliveryBoys'];
      this.totalCanceledOrders = value['data']['totalCanceledOrders'];
    this.createChart();

      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }


  getRevenueChartData(){
    // dayOfMonth,week,year,month
    this.auth.getRevenueChartData("month")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.revenueChartData = value['data']['data'];
        this.revenueChartLables = value['data']['label'];
        this.createChartTotalRevenue();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  getOrderChartData(){
    // dayOfMonth,week,year,month
    this.auth.getOrderChartData("dayOfMonth")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.orderChartData = value['data']['data'];
        this.orderChartLables = value['data']['label'];
        this.createChartTotalOrders();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  viewNotifications(){

  }
}
