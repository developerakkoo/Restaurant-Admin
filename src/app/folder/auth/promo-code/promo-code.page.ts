import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AddPage } from './add/add.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationPage } from './notification/notification.page';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.page.html',
  styleUrls: ['./promo-code.page.scss'],
})
export class PromoCodePage implements OnInit {
  codes: any[] = [];

  constructor(
    private modalController: ModalController,
    private auth: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllCodes();
  }

  async openAddPromoModal() {
    const modal = await this.modalController.create({
      component: AddPage,
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      componentProps: { mode: 'create' },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      this.getAllCodes();
    }
  }

  async openEditPromoModal(item: any) {
    const modal = await this.modalController.create({
      component: AddPage,
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      componentProps: { mode: 'edit', promo: item },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      this.getAllCodes();
    }
  }

  getAllCodes() {
    this.auth.getAllPromos('', '').subscribe({
      next: (value: any) => {
        this.codes = value['data'] || [];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }

  getDiscountLabel(item: any): string {
    switch (Number(item.codeType)) {
      case 1:
        return 'Free delivery';
      case 2:
        return `₹${item.discountAmount} off`;
      case 3:
        return `₹${item.discountAmount} off (new user)`;
      default:
        return `${item.discountAmount}`;
    }
  }

  getTypeLabel(item: any): string {
    switch (Number(item.codeType)) {
      case 1:
        return 'Free delivery';
      case 2:
        return 'Flat discount';
      case 3:
        return 'New user';
      default:
        return 'Promo';
    }
  }

  formatExpiry(expiry: string): string {
    if (!expiry) {
      return '—';
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(expiry)) {
      const [y, m, d] = expiry.split('-');
      return `${d}-${m}-${y}`;
    }
    return expiry;
  }

  isExpired(item: any): boolean {
    return Boolean(item.isExpired);
  }

  async confirmDelete(item: any) {
    const alert = await this.alertController.create({
      header: 'Delete promo code',
      message: `Delete ${item.code}? This cannot be undone.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deletePromo(item),
        },
      ],
    });
    await alert.present();
  }

  deletePromo(item: any) {
    this.auth.deletePromo(item._id).subscribe({
      next: async () => {
        await this.presentToast('Promo deleted', 'success');
        this.getAllCodes();
      },
      error: async () => {
        await this.presentToast('Could not delete promo', 'danger');
      },
    });
  }

  async openNotificationModal(item: any) {
    if (this.isExpired(item)) {
      await this.presentToast('Cannot send an expired promo code', 'warning');
      return;
    }

    const modal = await this.modalController.create({
      component: NotificationPage,
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data?.userId) {
      this.auth.sendPromoNotification(item._id, data.userId).subscribe({
        next: async () => {
          await this.presentToast('Promo sent to user', 'success');
        },
        error: async (error: HttpErrorResponse) => {
          const message =
            error.error?.message || 'Could not send promo notification';
          await this.presentToast(message, 'danger');
        },
      });
    }
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2200,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
