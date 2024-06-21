import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryBoyPage } from './delivery-boy.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryBoyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryBoyPageRoutingModule {}
