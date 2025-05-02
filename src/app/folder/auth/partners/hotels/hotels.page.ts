import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss'],
})
export class HotelsPage implements OnInit {
  form!:FormGroup;
  isHotelImageUploadModalOpen:boolean = false;
  hotelId:any;
  categories:any[] = [];
  lat:any;
  lng:any;
  partnerId:any;
  constructor(private formBuilder: FormBuilder,
    private auth:AuthService,
    private data: DataService,
    private router: Router,
    private route:ActivatedRoute,
              private loadingController: LoadingController,
              private toastController: ToastController) {
                this.lat = this.route.snapshot.paramMap.get('lng');
                this.lng = this.route.snapshot.paramMap.get('lat');
                this.partnerId = this.route.snapshot.paramMap.get('id');
                this.form = this.formBuilder.group({
                  hotelName:[,[Validators.required]],
                  address:[,[Validators.required]],
                  categoryId:[[],[Validators.required]]
                })

               }


  ngOnInit() {
    this.loadCategory();
  }
  async presentToast(msg:string, duration:any, color:any, position:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      color:color,
      position:position
    });
    toast.present();
  }


  async uploadImage(ev:any){
    let loading = await this.loadingController.create({
      message:"Uploading image...",
      animated:true,
    
    })
    await loading.present();
    let file = ev.target.files[0];
    
    console.log(file);
    let formdata = new FormData();
    formdata.append("document", file, file.name);
    formdata.append("hotelId", this.hotelId);
    this.auth.uploadHotelImage(formdata)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.isHotelImageUploadModalOpen = false;
        this.presentToast("Hotel Registered Successfully", 2000, 'success','bottom');
        await loading.dismiss();
        setTimeout(() =>{
          this.router.navigate(['folder', 'partners']);

         },1000)
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.isHotelImageUploadModalOpen = true;
        this.presentToast("Image Upload Failed", 2000, 'danger','bottom')
        await loading.dismiss();
      }
    })

  }

  setOpen(isOpen: boolean) {
    this.isHotelImageUploadModalOpen = isOpen;
  }

  async onSubmit(){
    let loading = await this.loadingController.create({
      message:"Registering hotel...",
      animated:true,
    
    })
    await loading.present();
    if(this.form.valid){
      console.log(this.form.value);
      this.auth.hotelRegister(this.form.value.hotelName,this.form.value.address, this.form.value.categoryId, this.lng, this.lat,this.partnerId)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          await loading.dismiss();
          this.isHotelImageUploadModalOpen = true;
          this.hotelId = value['data']['_id'];
          await this.data.set("hotelCount", "1");
          await this.data.set("hotelId", value['data']['_id']);
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error.error);
          await loading.dismiss();
          this.isHotelImageUploadModalOpen = false;
          
        }
      })
    }
  }


  loadCategory(){
    this.auth.getAllCategory()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.categories = value['data']['content'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
}
