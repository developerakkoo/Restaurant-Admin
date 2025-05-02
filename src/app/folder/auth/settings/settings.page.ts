import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  deliveryOne: {} = { lower: 1, upper: 5 };
  deliveryTwo: {} = { lower: 5, upper: 10 };
  deliveryThree: {} = { lower: 10, upper: 15 };
  deliveryPriceOne: any;
  deliveryPriceTwo: any;
  deliveryPriceThree: any;
  handling: string = '';
  gst: string = '';
  id: string = '';
  gstToggle!:boolean;
  deliveryUpdateId: string = '66a09811fc461cb7a5617384';
  bonusForm: FormGroup;

  constructor(
    private auth: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private http: HttpService
  ) {
    this.bonusForm = this.fb.group({
      perDeliveryAmount: ['', [Validators.required, Validators.min(0)]],
      bonus16thDelivery: ['', [Validators.required, Validators.min(0)]],
      bonus21stDelivery: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllCharges();
    this.getAllDeliveryCharges();
    this.getBonusSettings();
  }

  getAllDeliveryCharges() {
    this.auth.getDeliveryCharges().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.deliveryOne = {
          lower: value['data'][0]['range1MinKm'],
          upper: value['data'][0]['range1MaxKm'],
        };
        this.deliveryPriceOne = value['data'][0]['range1Price'];
        this.deliveryPriceTwo = value['data'][0]['range2Price'];
        this.deliveryPriceThree = value['data'][0]['range3Price'];
        this.deliveryTwo = {
          lower: value['data'][0]['range2MinKm'],
          upper: value['data'][0]['range2MaxKm'],
        };
        this.deliveryThree = {
          lower: value['data'][0]['range3MinKm'],
          upper: value['data'][0]['range3MaxKm'],
        };
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }
  getAllCharges() {
    this.auth.getCharges().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.id = value['data'][0]['_id'];
        this.gst = value['data'][0]['gstPercentage'];
        this.handling = value['data'][0]['platformFee'];
        this.gstToggle = value['data'][0]['gstIsActive'];
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }

  gstToggleEvent(ev:any){
    console.log(ev.detail);
    this.auth.updateGstToggleStatus(ev.detail.checked)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  rangeChangeGST(ev: any) {
    console.log(ev.detail.value);
    this.gst = ev.detail.value;
  }

  rangeChangeDeliveryOne(ev: any) {
    console.log(ev.detail.value);
    console.log(this.deliveryPriceOne);

    this.deliveryOne = ev.detail.value;
    this.auth
      .updateDeliveryCharges(
        {
          range1Price: this.deliveryPriceOne,
          range1MinKm: ev.detail.value.lower,
          range1MaxKm: ev.detail.value.upper,
        },
        this.deliveryUpdateId
      )
      .subscribe({
        next: async (value: any) => {
          console.log(value);
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  rangeChangeDeliveryTwo(ev: any) {
    console.log(ev.detail.value);
    console.log(this.deliveryPriceTwo);

    this.deliveryTwo = ev.detail.value;
    this.auth
      .updateDeliveryCharges(
        {
          range2Price: this.deliveryPriceTwo,
          range2MinKm: ev.detail.value.lower,
          range2MaxKm: ev.detail.value.upper,
        },
        this.deliveryUpdateId
      )
      .subscribe({
        next: async (value: any) => {
          console.log(value);
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  rangeChangeDeliveryThree(ev: any) {
    console.log(ev.detail.value);
    console.log(this.deliveryPriceThree);

    this.deliveryThree = ev.detail.value;
    this.auth
      .updateDeliveryCharges(
        {
          range3Price: this.deliveryPriceThree,
          range3MinKm: ev.detail.value.lower,
          range3MaxKm: ev.detail.value.upper,
        },
        this.deliveryUpdateId
      )
      .subscribe({
        next: async (value: any) => {
          console.log(value);
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  rangeChangeHandling(ev: any) {
    console.log(ev.detail.value);
    this.handling = ev.detail.value;
  }

  async onSubmit() {
    this.auth.updateCharges(this.handling, this.gst, this.id).subscribe({
      next: async (value: any) => {
        console.log(value);
        this.getAllCharges();
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }

  getBonusSettings() {
    this.http.getPerOrderEarnings().subscribe({
      next: (res: any) => {
        console.log(res);
          this.bonusForm.patchValue({
            perDeliveryAmount: res.perDeliveryAmount,
            bonus16thDelivery: res.bonus16thDelivery,
            bonus21stDelivery: res.bonus21stDelivery
          });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching bonus settings:', err);
        this.showToast('Failed to load bonus settings', 'danger');
      }
    });
  }

  async updateBonusSettings() {
    if (this.bonusForm.invalid) {
      this.showToast('Please fill all fields correctly', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Updating bonus settings...'
    });
    await loading.present();

    this.http.updatePerOrderEarnings(this.bonusForm.value).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.showToast('Bonus settings updated successfully', 'success');
      },
      error: async (err: HttpErrorResponse) => {
        await loading.dismiss();
        console.error('Error updating bonus settings:', err);
        this.showToast('Failed to update bonus settings', 'danger');
      }
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
