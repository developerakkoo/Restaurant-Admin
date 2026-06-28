import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

interface KmRange {
  lower: number;
  upper: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  deliveryOne: KmRange = { lower: 1, upper: 5 };
  deliveryTwo: KmRange = { lower: 5, upper: 10 };
  deliveryThree: KmRange = { lower: 10, upper: 15 };
  deliveryPriceOne: number | null = null;
  deliveryPriceTwo: number | null = null;
  deliveryPriceThree: number | null = null;
  handling: number | string = '';
  gst: number | string = '';
  id = '';
  gstToggle = false;
  deliveryUpdateId = '';
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
      petrolExpensePerOrder: ['', [Validators.required, Validators.min(0)]],
      bonus16thDelivery: ['', [Validators.required, Validators.min(0)]],
      bonus21stDelivery: ['', [Validators.required, Validators.min(0)]],
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
      next: (value: any) => {
        const record = value?.data?.[0];
        if (!record) {
          return;
        }

        this.deliveryUpdateId = record._id;
        this.deliveryOne = {
          lower: record.range1MinKm,
          upper: record.range1MaxKm,
        };
        this.deliveryPriceOne = record.range1Price;
        this.deliveryPriceTwo = record.range2Price;
        this.deliveryPriceThree = record.range3Price;
        this.deliveryTwo = {
          lower: record.range2MinKm,
          upper: record.range2MaxKm,
        };
        this.deliveryThree = {
          lower: record.range3MinKm,
          upper: record.range3MaxKm,
        };
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        this.showToast('Failed to load delivery charges', 'danger');
      },
    });
  }

  getAllCharges() {
    this.auth.getCharges().subscribe({
      next: (value: any) => {
        const record = value?.data?.[0];
        if (!record) {
          return;
        }

        this.id = record._id;
        this.gst = record.gstPercentage;
        this.handling = record.platformFee;
        this.gstToggle = record.gstIsActive ?? false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        this.showToast('Failed to load platform settings', 'danger');
      },
    });
  }

  gstToggleEvent(ev: any) {
    this.gstToggle = ev.detail.checked;
  }

  rangeChangeGST(ev: any) {
    this.gst = ev.detail.value;
  }

  rangeChangeDeliveryOne(ev: any) {
    this.deliveryOne = ev.detail.value;
  }

  rangeChangeDeliveryTwo(ev: any) {
    this.deliveryTwo = ev.detail.value;
  }

  rangeChangeDeliveryThree(ev: any) {
    this.deliveryThree = ev.detail.value;
  }

  rangeChangeHandling(ev: any) {
    this.handling = ev.detail.value;
  }

  private buildDeliveryChargesPayload() {
    return {
      range1Price: Number(this.deliveryPriceOne),
      range1MinKm: Number(this.deliveryOne.lower),
      range1MaxKm: Number(this.deliveryOne.upper),
      range2Price: Number(this.deliveryPriceTwo),
      range2MinKm: Number(this.deliveryTwo.lower),
      range2MaxKm: Number(this.deliveryTwo.upper),
      range3Price: Number(this.deliveryPriceThree),
      range3MinKm: Number(this.deliveryThree.lower),
      range3MaxKm: Number(this.deliveryThree.upper),
    };
  }

  private validatePlatformSettings(): string | null {
    if (!this.deliveryUpdateId) {
      return 'Delivery charges record not loaded. Refresh and try again.';
    }
    if (!this.id) {
      return 'Platform fee settings not loaded. Refresh and try again.';
    }

    const payload = this.buildDeliveryChargesPayload();
    const invalidField = Object.entries(payload).find(
      ([, value]) => !Number.isFinite(value)
    );
    if (invalidField) {
      return 'Please enter valid delivery prices and distance ranges.';
    }

    if (!Number.isFinite(Number(this.handling)) || !Number.isFinite(Number(this.gst))) {
      return 'Please enter valid platform fee and GST values.';
    }

    return null;
  }

  async savePlatformSettings() {
    const validationError = this.validatePlatformSettings();
    if (validationError) {
      this.showToast(validationError, 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Saving platform settings...',
    });
    await loading.present();

    forkJoin([
      this.auth.updateDeliveryCharges(
        this.buildDeliveryChargesPayload(),
        this.deliveryUpdateId
      ),
      this.auth.updateCharges(
        String(this.handling),
        this.gst,
        this.id,
        this.gstToggle
      ),
    ]).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showToast('Platform settings saved successfully', 'success');
        this.getAllCharges();
        this.getAllDeliveryCharges();
      },
      error: async (error: HttpErrorResponse) => {
        await loading.dismiss();
        console.error('Error saving platform settings:', error);
        this.showToast(
          error?.error?.message || 'Failed to save platform settings',
          'danger'
        );
      },
    });
  }

  getBonusSettings() {
    this.http.getPerOrderEarnings().subscribe({
      next: (res: any) => {
        this.bonusForm.patchValue({
          perDeliveryAmount: res.perDeliveryAmount,
          petrolExpensePerOrder: res.petrolExpensePerOrder ?? 5,
          bonus16thDelivery: res.bonus16thDelivery,
          bonus21stDelivery: res.bonus21stDelivery,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching bonus settings:', err);
        this.showToast('Failed to load bonus settings', 'danger');
      },
    });
  }

  async updateBonusSettings() {
    if (this.bonusForm.invalid) {
      this.showToast('Please fill all fields correctly', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Updating driver payout settings...',
    });
    await loading.present();

    this.http.updatePerOrderEarnings(this.bonusForm.value).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showToast('Driver payout settings updated successfully', 'success');
      },
      error: async (err: HttpErrorResponse) => {
        await loading.dismiss();
        console.error('Error updating bonus settings:', err);
        this.showToast('Failed to update driver payout settings', 'danger');
      },
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
