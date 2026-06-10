import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-document-viewer-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <img *ngIf="!isPdf" [src]="url" alt="Document" class="doc-image" />
      <div *ngIf="isPdf" class="pdf-block">
        <ion-icon name="document-text-outline"></ion-icon>
        <p>PDF document</p>
        <ion-button (click)="openPdf()">Open PDF</ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .doc-image {
        width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 8px;
      }
      .pdf-block {
        text-align: center;
        padding: 32px 16px;
      }
      .pdf-block ion-icon {
        font-size: 64px;
        color: var(--ion-color-primary);
      }
    `,
  ],
})
export class DocumentViewerModalComponent {
  title = 'Document';
  url = '';
  isPdf = false;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  openPdf() {
    window.open(this.url, '_blank');
  }
}
