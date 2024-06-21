import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoCodePageRoutingModule } from './promo-code-routing.module';

import { PromoCodePage } from './promo-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoCodePageRoutingModule
  ],
  declarations: [PromoCodePage]
})
export class PromoCodePageModule {}
