import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delivery-boy',
  templateUrl: './delivery-boy.page.html',
  styleUrls: ['./delivery-boy.page.scss'],
})
export class DeliveryBoyPage implements OnInit {

  boys:any[] = [];
  query:string = "";
  status:string = "";
  constructor(private auth:AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;
    this.getAllDeliveryBoys();
  }

  ionViewDidEnter(){
    this.getAllDeliveryBoys();
  }

  filterEvent(ev:any){
    console.log(ev.detail.value);
    this.status = ev.detail.value;
    this.getAllDeliveryBoys();
  }

  async getAllDeliveryBoys(){
    this.auth.getAllDeliveryBoys(this.query, 1, 50,"","", "")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.boys = value['data']['content'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
viewNotifications(){}
openDriverRegisterPage(){
  this.router.navigate(['folder','delivery-boy','add'])
    }
}
