import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(
    private auth: AuthService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllCharges();
    this.getAllDeliveryCharges();
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
}
