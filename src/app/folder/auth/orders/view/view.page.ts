import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  orderID:any;

  products:any[] = [];
  orderTimeline:any[] = [];

  orderId:any;

  priceDetails:any = {};
  user:any = {};
  hotel:any = {};
  address:any = {};
  assignedDeliveryBoy:any= {};
  constructor(private auth:AuthService,
              private route: ActivatedRoute
  ) {
    this.orderID = this.route.snapshot.paramMap.get("id");
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getOrder();
  }

  getOrder(){
    this.auth.getOrderById(this.orderID)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.orderId = value['data']['orderId'];
        this.assignedDeliveryBoy = value['data']['assignedDeliveryBoy'];
        this.hotel = value['data']['hotelId'];
        this.user = value['data']['userId'];
        this.address = value['data']['address'];
        this.priceDetails = value['data']['priceDetails']
        this.orderTimeline = value['data']['orderTimeline'];
        this.products = value['data']['products'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  view(hotelId:any){
    console.log(hotelId);
    
  }

}
