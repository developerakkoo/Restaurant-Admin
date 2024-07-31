import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  form:FormGroup;
  constructor(private auth:AuthService,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private fb: FormBuilder,
              private router: Router
  ) { 
    this.form = this.fb.group({
      name:[,[Validators.required]],
      email:[,[Validators.required, Validators.email]],
      phoneNumber:[,[Validators.required]],
      password:[,[Validators.required, Validators.min(8)]]
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

  async register(){
    let loading = await this.loadingController.create({
      message:"Logging In...",
      animated:true,
    
    })
    // await loading.present();
    if(this.form.valid){
      console.log(this.form.value);
      this.auth.registerPartner(this.form.value)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          await loading.dismiss();
          this.presentToast("Registered Successfully.",2000, 'success','bottom');
       

          this.router.navigate(['folder', 'partners','map']);
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error.error);
          await loading.dismiss();
          this.presentToast(error.error.message,2000, 'danger','bottom');

          
        }
      })
    }
  }
}
