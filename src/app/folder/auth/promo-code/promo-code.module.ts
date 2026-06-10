import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoCodePageRoutingModule } from './promo-code-routing.module';

import { PromoCodePage } from './promo-code.page';
import { AddPageModule } from './add/add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PromoCodePageRoutingModule,
    AddPageModule,
  ],
  declarations: [PromoCodePage],
})
export class PromoCodePageModule {}
