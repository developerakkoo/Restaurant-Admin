import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {

  partner:any[] = [];
  query:string ="";
  status:number =0;

  constructor(private auth: AuthService,
    private router: Router,
    private alertController: AlertController,
              private loadingController: LoadingController
  ) { }

  ngOnInit() {
    console.log('PartnersPage initialized');
  
  }

  ionViewDidEnter(){
    this.getAllPartners();
  }

  segmentChanged(ev:any){
    console.log(ev.detail.value);
    this.status = ev.detail.value;
    this.getAllPartners()
  }

  async getAllPartners(){
    this.auth.getAllPartners(this.query, 1, 100, "","", this.status)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.partner = value['data']['content'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;

    this.getAllPartners();
  }
  openPartnerRegisterPage(){
this.router.navigate(['folder','partners','add'])
  }
  viewNotifications(){}

  openhotel(hotel:any){
    console.log(hotel);

    if(hotel.isOnline === true){
      this.auth.setHotelLiveStatus(0,hotel._id)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          this.getAllPartners();
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error);
          
        }
      })
    }else if(hotel.isOnline === false){
      this.auth.setHotelLiveStatus(1,hotel._id)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllPartners();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
    }
    
   
  }
  closehotel(id:any){
    
  }
  openLocationPage(id:any){
    console.log(id);
    
    this.router.navigate(['folder','partners','map',id]);
  }
  openAddDishPage(id:any){
    console.log(id);
    
   this.router.navigate(['folder','partners','dish', id]);
  }


  openDishViewPage(id:any){
   this.router.navigate(['folder','partners','dish',id,'view',id]);

  }
  openViewPage(id:any){
    console.log(id);
    
    this.router.navigate(['folder','partners','view',id]);
  }


  async presentAlertConfirmForDelete(partnerId:any, hotelId:any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete the partner?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deletePartner(partnerId);
          }
        }
      ]
    });
  
    await alert.present();
  }
  deletePartner(partnerId:any){
    this.auth.deletePartnerComplete(partnerId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllPartners();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.getAllPartners();
      }
    })
  }
}
