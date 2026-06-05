import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

type RecipientMode = 'single' | 'multiple' | 'all';

interface CustomerOption {
  _id: string;
  name: string;
  phoneNumber: string;
  firebaseToken?: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  recipientMode: RecipientMode = 'single';
  notificationTitle = '';
  description = '';
  searchQuery = '';
  users: CustomerOption[] = [];
  selectedUserIds = new Set<string>();
  isSending = false;
  lastResult: {
    totalUsers: number;
    sent: number;
    failed: number;
    noToken: number;
  } | null = null;

  constructor(
    private auth: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  onRecipientModeChange(event: CustomEvent) {
    this.recipientMode = event.detail.value;
    this.selectedUserIds.clear();
  }

  onSearchChange(event: CustomEvent) {
    this.searchQuery = event.detail.value || '';
    this.loadCustomers();
  }

  loadCustomers() {
    this.auth
      .getAllCustomers(this.searchQuery, 1, 1000, '', '', '', '0')
      .subscribe({
        next: (response: any) => {
          this.users = response?.data?.content || [];
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  toggleUser(userId: string) {
    if (this.recipientMode === 'single') {
      this.selectedUserIds.clear();
      this.selectedUserIds.add(userId);
      return;
    }

    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
  }

  isSelected(userId: string): boolean {
    return this.selectedUserIds.has(userId);
  }

  selectAllWithToken() {
    this.selectedUserIds.clear();
    this.users
      .filter((user) => !!user.firebaseToken)
      .forEach((user) => this.selectedUserIds.add(user._id));
  }

  clearSelection() {
    this.selectedUserIds.clear();
  }

  get selectedCount(): number {
    return this.selectedUserIds.size;
  }

  get usersWithTokenCount(): number {
    return this.users.filter((user) => !!user.firebaseToken).length;
  }

  get canSend(): boolean {
    if (!this.notificationTitle.trim() || !this.description.trim()) {
      return false;
    }

    if (this.recipientMode === 'all') {
      return true;
    }

    return this.selectedUserIds.size > 0;
  }

  async sendNotification() {
    if (!this.canSend || this.isSending) {
      return;
    }

    if (this.recipientMode === 'all') {
      const confirmed = await this.confirmSendToAll();
      if (!confirmed) {
        return;
      }
    }

    const loading = await this.loadingController.create({
      message: 'Sending notifications...',
    });
    await loading.present();
    this.isSending = true;

    const body: {
      userIds: string[];
      notificationTitle: string;
      description: string;
      type: string;
      sendToAll?: boolean;
    } = {
      userIds: Array.from(this.selectedUserIds),
      notificationTitle: this.notificationTitle.trim(),
      description: this.description.trim(),
      type: 'ADMIN_BROADCAST',
    };

    if (this.recipientMode === 'all') {
      body.sendToAll = true;
      body.userIds = [];
    }

    this.auth.sendFirebaseNotification(body).subscribe({
      next: async (response: any) => {
        this.lastResult = response?.data || null;
        await loading.dismiss();
        this.isSending = false;
        await this.presentResultToast(this.lastResult);
      },
      error: async (error: HttpErrorResponse) => {
        await loading.dismiss();
        this.isSending = false;
        const message =
          error.error?.message || 'Failed to send notifications';
        await this.presentToast(message, 'danger');
      },
    });
  }

  private async confirmSendToAll(): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Send to all users?',
      message:
        'This will notify every customer who has push notifications enabled on their device.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Send', role: 'confirm' },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }

  private async presentResultToast(result: {
    totalUsers: number;
    sent: number;
    failed: number;
    noToken: number;
  } | null) {
    if (!result) {
      await this.presentToast('Notifications sent', 'success');
      return;
    }

    await this.presentToast(
      `Sent: ${result.sent}, Failed: ${result.failed}, No token: ${result.noToken}`,
      result.failed > 0 ? 'warning' : 'success'
    );
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3500,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
