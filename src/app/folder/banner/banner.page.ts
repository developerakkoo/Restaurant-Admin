import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ImageModalComponent } from './image-modal.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {

  homeImage!:File;
  profileImage!:File;
  cartImage!:File;

  bannnerImages:any = [
  ];

  constructor(private loadingController: LoadingController,
              private auth:AuthService,
              private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('BannerPage initialized');
    
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
        this.bannnerImages = value['data']['content'];
        await loading.dismiss();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        await loading.dismiss();

        
      }
    })
  }

  isBannerTypeExists(type: number): boolean {
    return this.bannnerImages.some((item: any) => item.type === type);
  }

  async deleteBanner(id:any){
    console.log(id);
    let loading = await this.loadingController.create({
      message:"Loading..."  
    })
    await loading.present();
    this.auth.deleteBannerImage(id)
    .subscribe({  
      next:async(value:any) =>{
        console.log(value);
        await loading.dismiss();
        this.getBanners();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        await loading.dismiss();
      }
    });
    
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
      
      // Clear the file input after successful upload
      if(type == 0){
        this.homeImage = null as any;
        // Reset the file input
        const homeInput = document.getElementById('home-banner-input') as HTMLInputElement;
        if(homeInput) homeInput.value = '';
      }else if(type == 1){
        this.cartImage = null as any;
        const cartInput = document.getElementById('cart-banner-input') as HTMLInputElement;
        if(cartInput) cartInput.value = '';
      }else if(type == 3){
        this.profileImage = null as any;
        const profileInput = document.getElementById('profile-banner-input') as HTMLInputElement;
        if(profileInput) profileInput.value = '';
      }
      
      this.getBanners();
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error);
      await loading.dismiss();

      
    }
   })
  }

  async openImageModal(imageUrl: string) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: { imageUrl },
      cssClass: 'image-modal'
    });
    await modal.present();
  }

  // Helper methods for UI
  getTypeClass(type: number): string {
    switch (type) {
      case 0:
        return 'home-badge';
      case 1:
        return 'cart-badge';
      case 3:
        return 'profile-badge';
      default:
        return '';
    }
  }

  getTypeIcon(type: number): string {
    switch (type) {
      case 0:
        return 'home-outline';
      case 1:
        return 'cart-outline';
      case 3:
        return 'person-outline';
      default:
        return 'image-outline';
    }
  }

  getTypeLabel(type: number): string {
    switch (type) {
      case 0:
        return 'Home';
      case 1:
        return 'Cart';
      case 3:
        return 'Profile';
      default:
        return 'Unknown';
    }
  }
}
