import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { RejectVerificationModalComponent } from './reject-verification-modal.component';
import { DocumentViewerModalComponent } from './document-viewer-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPageRoutingModule
  ],
  declarations: [ViewPage, RejectVerificationModalComponent, DocumentViewerModalComponent]
})
export class ViewPageModule {}
