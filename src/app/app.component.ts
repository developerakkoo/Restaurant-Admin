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
    { title: 'Dashboard', url: '/folder/dash', icon: 'speedometer' },
    { title: 'Orders', url: '/folder/orders', icon: 'cart' },
    { title: 'Partners', url: '/folder/partners', icon: 'people' },
    { title: 'Customers', url: '/folder/customer', icon: 'person' },
    { title: 'Delivery Boy', url: '/folder/delivery-boy', icon: 'bicycle' },
    { title: 'Categories', url: '/folder/category', icon: 'pricetags' },
    { title: 'Chat', url: '/folder/chat', icon: 'chatbubbles' },
    { title: 'Promo code', url: '/folder/promo-code', icon: 'pricetag' },
    { title: 'Banners', url: '/folder/banner', icon: 'images' },
    {
      title: 'Delivery/handling Charges',
      url: '/folder/settings',
      icon: 'settings',
    },
    {
      title: 'Pincode Setup',
      url: '/folder/pincode',
      icon: 'location',
    },
  ];
  constructor(private data: DataService, private router: Router) {
    this.checkForLoginStatus();
  }

  async checkForLoginStatus() {
    let userId = await this.data.get('userId');
    console.log(userId);
    if (userId != null || userId != undefined) {
      console.log('userid not null');
      this.router.navigate(['folder', 'dash']);
      // this.router.navigateByUrl("folder/orders/view/68075aa7b3b25603a1768ebd")
    } else {
      this.router.navigate(['folder', 'login']);
    }
  }
}
