import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  form!:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private toastController: ToastController,
    private auth: AuthService,
              private modalController: ModalController,
              private loadingController: LoadingController,
  ) { 
    this.form = this.formBuilder.group({
      name:[,[Validators.required]],
      code: [,[Validators.required]],
      codeType: [,[Validators.required]],
      discountAmount: [,[Validators.required]],
      minOrderAmount: [,[Validators.required]],
      description: [,[Validators.required]],
      expiry:[,[Validators.required]]
    })
  }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
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
  async onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      this.auth.addPromo(this.form.value)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          this.presentToast("Promo Code Added", 2000, 'success', 'top');
          this.modalController.dismiss();
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error.error);
          
        }
      })
    }
  }

}
