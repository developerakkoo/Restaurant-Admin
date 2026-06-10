import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  @Input() promo: any;
  @Input() mode: 'create' | 'edit' = 'create';

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private auth: AuthService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      codeType: ['1', [Validators.required]],
      discountAmount: ['', [Validators.required]],
      minOrderAmount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
      isActive: [true],
    });
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.promo) {
      this.form.patchValue({
        name: this.promo.name,
        code: this.promo.code,
        codeType: String(this.promo.codeType),
        discountAmount: this.promo.discountAmount,
        minOrderAmount: this.promo.minOrderAmount,
        description: this.promo.description,
        expiry: this.toDateInputValue(this.promo.expiry),
        isActive: this.promo.isActive !== false,
      });
    }
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  toDateInputValue(expiry: string): string {
    if (!expiry) {
      return '';
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(expiry)) {
      return expiry;
    }
    const parts = expiry.split('-');
    if (parts.length === 3 && parts[0].length === 2) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return expiry;
  }

  close(refresh = false) {
    this.modalController.dismiss({ refresh });
  }

  async presentToast(msg: string, duration: any, color: any, position: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration,
      color,
      position,
    });
    toast.present();
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const payload = {
      ...this.form.value,
      codeType: Number(this.form.value.codeType),
      discountAmount: Number(this.form.value.discountAmount),
      minOrderAmount: Number(this.form.value.minOrderAmount),
    };

    const request$ =
      this.mode === 'edit'
        ? this.auth.updatePromo(this.promo._id, payload)
        : this.auth.addPromo(payload);

    request$.subscribe({
      next: async () => {
        const message =
          this.mode === 'edit'
            ? 'Promo code updated'
            : 'Promo code added';
        await this.presentToast(message, 2000, 'success', 'top');
        this.close(true);
      },
      error: async (error: HttpErrorResponse) => {
        const message =
          error.error?.message || 'Could not save promo code';
        await this.presentToast(message, 2500, 'danger', 'top');
      },
    });
  }
}
