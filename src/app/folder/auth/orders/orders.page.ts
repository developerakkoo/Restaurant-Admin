import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders:any[] = [];
  drivers:any[] = [];
  query:string = "";
  status:string = "";
  constructor(private auth:AuthService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;
    this.getAllOrders();
    this.getAllDeliveryBoys();

  }

  ionViewDidEnter(){
    this.getAllOrders();
    this.getAllDeliveryBoys();
  }

  filterEvent(ev:any){
    console.log(ev.detail.value);
    this.status = ev.detail.value;
    this.getAllOrders();
    this.getAllDeliveryBoys();

  }
  async getAllDeliveryBoys(){
    this.auth.getAllDeliveryBoys(this.query, 1, 50,"","", "")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.drivers = value['data']['content'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  async getAllOrders(){
    this.auth.getAllOrders(this.query, 1, 50, this.status,"")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.orders = value['data']['content'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  acceptOrder(orderId:any){
    this.auth.AcceptRejectOrder(orderId, 4)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllOrders();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }


  rejectOrder(orderId:any){
    this.auth.AcceptRejectOrder(orderId, 5)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllOrders();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  async presentActionSheet(orderId:any) {
     const actionSheet = await this.actionSheetController.create({
       header: 'Albums',
       buttons: [{
         text: 'Accept',
         role: '',
         icon: 'checkmark',
         handler: () => {
           console.log('Delete clicked');
           this.acceptOrder(orderId);
         }
       }, {
         text: 'Reject',
         icon: 'trash',
         handler: () => {
           console.log('Share clicked');
           this.rejectOrder(orderId);
         }
       }, {
         text: 'Cancel',
         icon: 'close',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }]
     });
   
     await actionSheet.present();
    // else  if(this.status == 4){
    //  const actionSheet = await this.actionSheetController.create({
    //    header: 'Albums',
    //    buttons: [{
    //      text: 'Handed over to Delivery Boy',
    //      role: '',
    //      icon: 'checkmark',
    //      handler: () => {
    //        console.log('Delete clicked');
    //      }
    //    }, {
    //      text: 'Cancel',
    //      icon: 'close',
    //      role: 'cancel',
    //      handler: () => {
    //        console.log('Cancel clicked');
    //      }
    //    }]
    //  });
   
    //  await actionSheet.present();
    // }
   }
viewNotifications(){}
assignDriverEvent(ev:any, orderId:any){
  console.log(ev.detail.value);
  console.log(orderId);
  
  this.auth.assignDeliveryBoy(orderId, ev.detail.value)
  .subscribe({
    next:async(value:any) =>{
      console.log(value);
      this.getAllOrders();
      this.getAllDeliveryBoys();
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error.error);
      
    }
  })
}
}
