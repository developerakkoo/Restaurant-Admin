import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  template: `
    <div class="modal-container">
      <img crossorigin="anonymous"  [appRemoveport]="imageUrl" alt="Full Image" class="full-image">
      <ion-button class="close-button" (click)="closeModal()">Close</ion-button>
    </div>
  `,
  styles: [`
    .modal-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }
    .full-image {
      max-width: 90%;
      max-height: 80%;
      border-radius: 8px;
    }
    .close-button {
      margin-top: 20px;
    }
  `]
})
export class ImageModalComponent {
  @Input() imageUrl!: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
