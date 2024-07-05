import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  delivery:string = "";
  handling:string = "";
  gst:string = "";
  id:string = "";
  constructor(private auth:AuthService,
              private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getAllCharges();

  }


  getAllCharges(){
    this.auth.getCharges()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.id = value['data'][0]['_id'];
        this.delivery = value['data'][0]['deliveryCharges']
        this.gst = value['data'][0]['gstPercentage']
        this.handling = value['data'][0]['platformFee']
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  rangeChangeGST(ev:any){
    console.log(ev.detail.value);
    this.gst = ev.detail.value;
    
  }

  rangeChangeDelivery(ev:any){
    console.log(ev.detail.value);
    this.delivery = ev.detail.value;
  }

  rangeChangeHandling(ev:any){
    console.log(ev.detail.value);
    this.handling = ev.detail.value;
    
  }

  async onSubmit(){
    this.auth.updateCharges(this.handling, this.delivery, this.gst, this.id)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllCharges();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

}
