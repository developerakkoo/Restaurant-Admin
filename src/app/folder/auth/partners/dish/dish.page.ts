import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  dishId: any;
  hotelId: any;
  hotels: any[] = [];
  categories: any[] = [];
  isDishImageUploadModalOpen: boolean = false;
  form!: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private route:ActivatedRoute,
    private toastController: ToastController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private http:HttpClient
  ) {
    this.hotelId = this.route.snapshot.paramMap.get("id");
    console.log(this.hotelId);
    
    this.loadCategory();
    this.getAllHotels();
    this.form = this.fb.group({
      dishes: this.fb.array([this.createDishFormGroup()])
    });
  }

  ngOnInit() {
    console.log("Dish Page");
  }

  ionViewDidEnter() {
   
  }
  createDishFormGroup(): FormGroup {
    console.log(this.hotelId);
    
    return this.fb.group({
      hotelId: [this.hotelId,[Validators.required]],
      categoryId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dishType: ['', [Validators.required]],
      partnerPrice: ['', [Validators.required]],
      userPrice: ['', [Validators.required]],
      spicLevel: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      image_url: ['', [Validators.required]],
      status: [2],
      timeToPrepare: [30]
    });
  }
  
  get dishes(): FormArray {
    return this.form.get('dishes') as FormArray;
  }

  addDish() {
    this.dishes.push(this.createDishFormGroup());
  }
  
  removeDish(index: number) {
    this.dishes.removeAt(index);
  }
  
  loadCategory() {
    this.auth.getAllCategory().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.categories = value['data']['content'];
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }

  async presentToast(msg: string, duration: any, color: any, position: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      color: color,
      position: position,
    });
    toast.present();
  }

  uploadImage(ev: any) {
    let file = ev.target.files[0];

    console.log(file);
    let formdata = new FormData();
    formdata.append('document', file, file.name);
    formdata.append('dishId', this.dishId);
    this.auth.uploadDishImage(formdata).subscribe({
      next: async (value: any) => {
        console.log(value);
        this.setOpen(false);
      
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);

        this.presentToast('Image Upload Failed', 2000, 'danger', 'bottom');
      },
    });
  }

  setOpen(isOpen: boolean) {
    this.isDishImageUploadModalOpen = isOpen;
  }

  async onSubmit() {

    if(this.form.invalid){
      console.log(this.form.value);
      console.log("Foerm Invalid");
      
      
    }
    if (this.form.valid) {
      console.log(this.form.value);
      this.auth.addProduct(this.form.value).subscribe({
        next: (value: any) => {
          console.log(value);
          this.presentToast(
            'Dish Addedd Successfully',
            2000,
            'success',
            'bottom'
          );
          setTimeout(() => {
            this.router.navigate(['folder', 'partners']);
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
        },
      });
    }
  }

  async getAllHotels() {
    // let loading = await this.loadingController.create({
    //   message: 'loading...',
    // });

    // await loading.present();

    // this.auth.getAllHotelsPartner().subscribe({
    //   next: async (value: any) => {
    //     console.log(value);
    //     this.hotels = value['data'];
    //     await loading.dismiss();
    //   },
    //   error: async (error: HttpErrorResponse) => {
    //     console.log(error);
    //     await loading.dismiss();
    //   },
    // });
  }
  viewNotifications() {}
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      this.http.post<{ imageUrl: string }>(environment.URL + `admin/upload/image`, formData).subscribe((response:any) => {
        const dishes = this.form.get('dishes') as FormArray;
        const dish = dishes.at(index) as FormGroup;
        dish.patchValue({
          image_url: response.data
        });
      }, (error:any) => {
        console.error('Error uploading file:', error);
      });
    }
  }

  removeImage(index: number) {
    const dishes = this.form.get('dishes') as FormArray;
    const dish = dishes.at(index) as FormGroup;
    dish.patchValue({
      image_url: ''
    });
  }
}
