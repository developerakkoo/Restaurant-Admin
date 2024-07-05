import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  form!:FormGroup;
  isLoading:boolean = false;
  imageSrc: string | ArrayBuffer | null = null;
  file!:any;
  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
              private loadingController: LoadingController,
              private toastController: ToastController
  ) {

    
    this.form = this.formBuilder.group({
      firstName:[,[Validators.required]],
      lastName:[,[Validators.required]],
      fatherName:[,[Validators.required]],
      bloodGroup:[,[Validators.required]],
      dateOfBirth:[,[Validators.required]],
      address:[,[Validators.required]],
      languages:[['marthi, hindi'],[Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],

    })

   }


  ngOnInit() {
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
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.file = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      this.auth.registerDeliveryBoy(this.form.value)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          this.presentToast("delivery partner registered", 2000, 'success', 'top');
          
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error.error);
          this.presentToast("Something went wrong", 2000, 'danger', 'top');
          
        }
      })
    }
  }

}
