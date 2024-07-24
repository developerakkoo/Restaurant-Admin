import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {

  partner:any[] = [];
  query:string ="";

  constructor(private auth: AuthService,
    private router: Router,
              private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getAllPartners();
  }

  async getAllPartners(){
    this.auth.getAllPartners(this.query, 1, 50, "","", "")
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
  openLocationPage(){
    this.router.navigate(['folder','partners','map']);
  }
}
