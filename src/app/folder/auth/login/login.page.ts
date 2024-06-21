import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  constructor(
    private menuController: MenuController,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private data: DataService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.menuController.enable(false);
    this.loginForm = this.formBuilder.group({
      email: [
        'admin@dropeat.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['Admin@123', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  async presentToast(msg:string, duration:number, display:any, color:string) {
    const toast = await this.toastController.create({
      message:msg,
      duration: duration,
      position:display,
      color:color
    });
    toast.present();
  }
  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 5000,
    });
    await loading.present();

    this.auth.login(this.loginForm.value).subscribe({
      next: async (value: any) => {
        console.log(value);
        let accessToken = value['accessToken'];
        let refreshToken = value['refreshToken'];
        let userId = value['userId'];
        await this.data.set('accessToken', accessToken);
        await this.data.set('refreshToken', refreshToken);
        await this.data.set('userId', userId);
        await loading.dismiss();
        this.presentToast("Login Successfull!", 2000, "top","success");
        this.router.navigate(["folder"]);
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
        await loading.dismiss();
        this.presentToast(error.error.message, 3000, "top", "danger");

      },
    });
  }
}
