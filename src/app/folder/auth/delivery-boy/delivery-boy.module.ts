import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryBoyPageRoutingModule } from './delivery-boy-routing.module';

import { DeliveryBoyPage } from './delivery-boy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryBoyPageRoutingModule
  ],
  declarations: [DeliveryBoyPage]
})
export class DeliveryBoyPageModule {}
