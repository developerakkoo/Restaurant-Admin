import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse, HttpParameterCodec } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  query:string = "";
  cats:any[] = [];
  constructor(
    private router: Router,
    private auth: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter(){
    this.getAllCategory();
  }
  viewNotifications() {}

  async add() {
    const modal = await this.modalController.create({
      component: AddPage,
      canDismiss: true,
      backdropDismiss: false,
      animated: true,
      mode: 'ios',
      componentProps: { value: 123 },
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
  }

  getAllCategory(){
    this.auth.getAllCategories(this.query)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.cats = value['data']['content'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  delete(item:any){
    this.auth.deleteCategory(item)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllCategory()
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
}
