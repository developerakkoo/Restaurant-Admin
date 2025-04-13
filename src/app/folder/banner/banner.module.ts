import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerPageRoutingModule } from './banner-routing.module';

import { BannerPage } from './banner.page';
import { RemoveportDirective } from 'src/app/shared/directives/removeport.directive';
import { ImageModalComponent } from './image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerPageRoutingModule
  ],
  declarations: [BannerPage,RemoveportDirective,ImageModalComponent]
})
export class BannerPageModule {}
