import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationPage } from './notification/notification.page';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.page.html',
  styleUrls: ['./promo-code.page.scss'],
})
export class PromoCodePage implements OnInit {

  codes:any[] = [];

  constructor(private modalController: ModalController,
    private auth: AuthService,
    private http:HttpService,
              private loadingController: LoadingController
  ) { }

  ngOnInit() {
    // this.getAllCodes();
console.log("codes");

  }

  ionViewDidEnter(){
    this.getAllCodes();
  }

  async openAddPromoModal() {
    const modal = await this.modalController.create({
    component: AddPage,
    animated:true,
    backdropDismiss:false,
    keyboardClose:true,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

  async getAllCodes(){
    this.auth.getAllPromos("","")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.codes = value['data'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  async openNotificationModal(item: any) {
    // Create a modal for selecting a user
    const modal = await this.modalController.create({
      component: NotificationPage, // Assume this is a component for selecting users
      animated: true,
      backdropDismiss: false,
      keyboardClose: true
    });

    await modal.present();

    // Handle the result from the modal
    const { data } = await modal.onWillDismiss();
    if (data && data.userId) {
      // Log the notification details
      // console.log({
      //   userId: data.userId,
      //   title: 'Promo Notification',
      //   type: 'promo',
      //   message: `Get ${item.discountAmount}% off on next order. Order Now!`
      // });

      let payload = {
        userId: data.userId,
        title: 'Promo Notification',
        type: 'promo',
        message: `Get ${item.discountAmount}% off on next order. Order Now!`
      }

      console.log(payload);
      
       this.http.sendPromoNotification(payload).subscribe((res:any) => {
        console.log(res);
        this.getAllCodes();
       })
    }
  }

}
