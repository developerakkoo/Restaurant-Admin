import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {

  homeImage!:File;
  profileImage!:File;
  cartImage!:File;


  constructor(private loadingController: LoadingController,
              private auth:AuthService
  ) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
this.getBanners();
  }


  homeImageEvent(event:any){
    console.log(event.target.files);
    
    this.homeImage = event.target.files[0];

  }

  profileImageEvent(event:any){
    console.log(event.target.files);
    
    this.profileImage = event.target.files[0];
    
  }

  cartImageEvent(event:any){
    console.log(event.target.files);
    
    this.cartImage = event.target.files[0];
    
  }

  async getBanners(){
    let loading = await this.loadingController.create({
      message:"Loading..."
    })

    await loading.present();

    this.auth.getAllBannerImageByType()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        await loading.dismiss();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        await loading.dismiss();

        
      }
    })
  }


  async deleteBanner(id:any){
    console.log(id);
    
  }

  async uploadBanner(type:any){
    let loading = await this.loadingController.create({
      message:"Loading..."
    })
  
    await loading.present();
    let formdata = new FormData();

    console.log(type);
    console.log(typeof(type));
    
    
   if(type == 0){
    formdata.append("type", type);
    formdata.append("image",this.homeImage,this.homeImage.name);
   }else if(type == 1){
    formdata.append("type", type);
    formdata.append("image",this.cartImage,this.cartImage.name);
   }
   else if(type == 3){
    formdata.append("type", type);
    formdata.append("image",this.profileImage,this.profileImage.name);
   }

   console.log(formdata);
  
   this.auth.uploadBannerImage(formdata)
   .subscribe({
    next:async(value:any) =>{
      console.log(value);
      await loading.dismiss();
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error);
      await loading.dismiss();

      
    }
   })
  }
}
