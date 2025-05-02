import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettlePageRoutingModule } from './settle-routing.module';

import { SettlePage } from './settle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettlePageRoutingModule
  ],
  declarations: [SettlePage]
})
export class SettlePageModule {}
