import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  orderId: string;
  user: any;
  hotel: any;
  partner:any;
  delivery:any;
  address: any;
  products: any[] = [];
  orderTimeline: any[] = [];
  priceDetails: any;
  assignedDeliveryBoy: any;
  paymentMode!: string;
  partnerEarning = 0;
adminEarning = 0;
  
subscriptions!:Subscription;
  isLoading:boolean = false;
  constructor(private auth:AuthService,
              private route: ActivatedRoute,
              private router:Router
  ) {
    this.orderId = this.route.snapshot.paramMap.get("id") as string;
   }

  ngOnInit() {
    console.log("");
    this.getOrder();

    
  }

  ionViewDidLeave(){
    this.subscriptions.unsubscribe();
  }

  ionViewDidEnter(){
  }

  getOrder(){
    this.isLoading = true;
   this.subscriptions =  this.auth.getOrderById(this.orderId)
    .subscribe({
      next:async(value:any) =>{
        console.log("Order Details Detched");
        
        console.log(value);
        this.orderId = value['data']['orderId'];
        this.assignedDeliveryBoy = value['data']['assignedDeliveryBoy'];
        this.hotel = value['data']['hotelId'];
        this.user = value['data']['userId'];
        this.address = value['data']['address'];
        this.priceDetails = value['data']['priceDetails']
        this.orderTimeline = value['data']['orderTimeline'];
        this.products = value['data']['products'];
        this.paymentMode = value['data']['paymentMode'];
        this.delivery = value['data']['assignedDeliveryBoy']['_id'];
        this.partner = value['data']['hotelId']['userId'];
        let partnerTotal = 0;
      let userTotal = 0;

      this.products.forEach((item: any) => {
        const qty = item.quantity || 1;
        const partnerPrice = item.dishId.partnerPrice || 0;
        const userPrice = item.dishId.userPrice || 0;

        partnerTotal += partnerPrice * qty;
        userTotal += userPrice * qty;
      });

      const gst = this.priceDetails.gstAmount || 0;
      const platformFee = this.priceDetails.platformFee || 0;
      const discount = this.priceDetails.discount || 0;

      this.partnerEarning = partnerTotal;
      // Option 1: Exclude GST
this.adminEarning = userTotal - partnerTotal - discount + platformFee;

// Option 2: Include GST if admin keeps it
// this.adminEarning = userTotal - partnerTotal - discount + gst + platformFee;

this.partnerEarning = partnerTotal;
        this.isLoading = false;
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.isLoading = false;
        
      }
    })
  }

  viewDetails(type: string) {
    console.log(`Viewing details of: ${type}`);
    // You can navigate or open modal etc.
    if(type == 'customer'){
      console.log("customer");
      this.router.navigate(['folder','customer','view',this.user['_id']])
    }

    else if(type == 'restaurant'){
      console.log("restaurant");
      this.router.navigate(['folder','partners','view',this.partner])

      
    }
    else if(type == 'delivery'){
      console.log("delivery");
      this.router.navigate(['folder','delivery-boy','view',this.delivery])

      
    }
  }

  

}
