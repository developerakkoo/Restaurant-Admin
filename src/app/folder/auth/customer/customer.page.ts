import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isBlocked:number = 0;
  constructor(private auth:AuthService,
    private loadingController: LoadingController,
    private router:Router
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
    this.auth.getAllCustomers(this.query, 1, 50,"","", this.status,this.isBlocked)
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
openDetailsPage(id:any){
  this.router.navigate(['folder','customer','view',id])
}

segmentChanged(ev:any){
  console.log(ev.detail.value);
  this.isBlocked = ev.detail.value;
  this.getAllCustomers();
  
}

block(item:any){
  this.auth.blockUnblockCustomer({
    userId: item,
    status:1
  }).subscribe({
    next:async(value:any) =>{
      console.log(value);
      this.getAllCustomers();
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error);
      
    }
  })
}

unblock(item:any){
  this.auth.blockUnblockCustomer({
    userId: item,
    status:0
  }).subscribe({
    next:async(value:any) =>{
      console.log(value);
      this.getAllCustomers();
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error);
      
    }
  })
}
}
