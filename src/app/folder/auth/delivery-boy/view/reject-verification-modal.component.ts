import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reject-verification-modal',
  templateUrl: './reject-verification-modal.component.html',
  styleUrls: ['./reject-verification-modal.component.scss'],
})
export class RejectVerificationModalComponent {
  @Input() driverName = 'Driver';

  rejectionType: 'reupload' | 'permanent' = 'reupload';
  reason = '';

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const trimmed = this.reason.trim();
    if (trimmed.length < 10) {
      return;
    }
    this.modalController.dismiss(
      {
        rejectionType: this.rejectionType,
        reason: trimmed,
      },
      'confirm'
    );
  }
}
