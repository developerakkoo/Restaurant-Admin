import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.page.html',
  styleUrls: ['./promo-code.page.scss'],
})
export class PromoCodePage implements OnInit {

  codes:any[] = [];

  constructor(private modalController: ModalController,
    private auth: AuthService,
              private loadingController: LoadingController
  ) { }

  ngOnInit() {
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

}
