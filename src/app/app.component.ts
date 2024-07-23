import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/folder/dash', icon: 'mail' },
    { title: 'Orders', url: '/folder/orders', icon: 'paper-plane' },
    { title: 'Partners', url: '/folder/partners', icon: 'heart' },
    { title: 'Customers', url: '/folder/customer', icon: 'archive' },
    { title: 'Delivery Boy', url: '/folder/delivery-boy', icon: 'trash' },
    { title: 'Categories', url: '/folder/category', icon: 'card' },
    { title: 'Chat', url: '/folder/chat', icon: 'warning' },
    { title: 'Promo code', url: '/folder/promo-code', icon: 'warning' },
    { title: 'Delivery/handling Charges', url: '/folder/settings', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private data:DataService,
              private router:Router
  ) {
    this.checkForLoginStatus();
  }


  async checkForLoginStatus(){
    let userId = await this.data.get("userId");
    console.log(userId);
    if(userId != null || userId != undefined){
      console.log("userid not null");
      this.router.navigate(['folder', 'dash']);
      
    }
    else{
      this.router.navigate(['folder','login']);
    }
    
  }
}
