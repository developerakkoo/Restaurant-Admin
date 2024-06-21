import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders:any[] = [];
  
  constructor() {}

  ngOnInit() {}

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
  }

  viewNotifications(){}
  
}
