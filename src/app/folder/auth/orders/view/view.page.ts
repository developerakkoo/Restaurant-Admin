import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  mongoOrderId = '';
  orderId = '';
  orderStatus = 0;
  user: any;
  hotel: any;
  partner: any;
  delivery: any;
  address: any;
  products: any[] = [];
  orderTimeline: any[] = [];
  priceDetails: any;
  assignedDeliveryBoy: any;
  paymentMode = '';
  paymentId = '';
  partnerEarning = 0;
  adminEarning = 0;

  refundStatus = 'NOT_APPLICABLE';
  refundMessage = '';
  refundAmount = 0;
  refundFormStatus = 'PENDING';
  refundFormMessage = '';
  isSavingRefund = false;

  subscriptions!: Subscription;
  isLoading = false;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {
    this.mongoOrderId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
    this.getOrder();
  }

  ionViewDidLeave() {
    this.subscriptions?.unsubscribe();
  }

  getOrder() {
    this.isLoading = true;
    this.subscriptions = this.auth.getOrderById(this.mongoOrderId).subscribe({
      next: async (value: any) => {
        const data = value['data'];
        this.orderId = data['orderId'];
        this.orderStatus = data['orderStatus'] ?? data['status'] ?? 0;
        this.assignedDeliveryBoy = data['assignedDeliveryBoy'];
        this.hotel = data['hotelId'];
        this.user = data['userId'];
        this.address = data['address'];
        this.priceDetails = data['priceDetails'];
        this.orderTimeline = data['orderTimeline'] || [];
        this.products = data['products'] || [];
        this.paymentMode = data['paymentMode'] || '';
        this.paymentId = data['paymentId'] || '';
        this.refundStatus = data['refundStatus'] || 'NOT_APPLICABLE';
        this.refundMessage = data['refundMessage'] || '';
        this.refundAmount = data['refundAmount'] || data['priceDetails']?.totalAmountToPay || 0;
        this.refundFormStatus = this.refundStatus === 'NOT_APPLICABLE' ? 'PENDING' : this.refundStatus;
        this.refundFormMessage = this.refundMessage;
        this.delivery = data['assignedDeliveryBoy']?._id;
        this.partner = data['hotelId']?.userId;

        let partnerTotal = 0;
        let userTotal = 0;

        this.products.forEach((item: any) => {
          const qty = item.quantity || 1;
          const partnerPrice = item.dishId?.partnerPrice || 0;
          const userPrice = item.dishId?.userPrice || 0;

          partnerTotal += partnerPrice * qty;
          userTotal += userPrice * qty;
        });

        const discount = this.priceDetails?.discount || 0;
        const platformFee = this.priceDetails?.platformFee || 0;

        this.partnerEarning = partnerTotal;
        this.adminEarning = userTotal - partnerTotal - discount + platformFee;
        this.isLoading = false;
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  showRefundPanel(): boolean {
    const paidOnline = ['RAZORPAY', 'UPI'].includes(
      String(this.paymentMode || '').toUpperCase()
    );
    const cancelled = [5, 7].includes(Number(this.orderStatus));
    return paidOnline && cancelled;
  }

  async saveRefundDetails() {
    if (
      ['COMPLETED', 'FAILED'].includes(this.refundFormStatus) &&
      !String(this.refundFormMessage || '').trim()
    ) {
      await this.presentToast('Customer refund message is required', 'danger');
      return;
    }

    this.isSavingRefund = true;
    this.auth
      .updateOrderRefund(this.mongoOrderId, {
        refundStatus: this.refundFormStatus,
        refundMessage: this.refundFormMessage,
      })
      .subscribe({
        next: async () => {
          await this.presentToast('Refund details updated', 'success');
          this.getOrder();
          this.isSavingRefund = false;
        },
        error: async (error: HttpErrorResponse) => {
          await this.presentToast(
            error?.error?.message || 'Could not update refund',
            'danger'
          );
          this.isSavingRefund = false;
        },
      });
  }

  viewDetails(type: string) {
    if (type == 'customer') {
      this.router.navigate(['folder', 'customer', 'view', this.user['_id']]);
    } else if (type == 'restaurant') {
      this.router.navigate(['folder', 'partners', 'view', this.partner]);
    } else if (type == 'delivery' && this.delivery) {
      this.router.navigate(['folder', 'delivery-boy', 'view', this.delivery]);
    }
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
    });
    await toast.present();
  }
}
