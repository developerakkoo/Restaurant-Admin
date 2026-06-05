import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnalyticsPageRoutingModule } from './analytics-routing.module';
import { AnalyticsPage } from './analytics.page';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, IonicModule, AnalyticsPageRoutingModule],
  declarations: [AnalyticsPage],
})
export class AnalyticsPageModule {}
