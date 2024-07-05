import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  users:any[] = [];
  query:string = "";
  status:string = "";
  constructor(private auth:AuthService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;
    this.getAllCustomers();
  }

  ionViewDidEnter(){
    this.getAllCustomers();
  }

  filterEvent(ev:any){
    console.log(ev.detail.value);
    this.status = ev.detail.value;
    this.getAllCustomers();
  }

  async getAllCustomers(){
    this.auth.getAllCustomers(this.query, 1, 50,"","", this.status)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.users = value['data']['content'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
viewNotifications(){}
  

}
