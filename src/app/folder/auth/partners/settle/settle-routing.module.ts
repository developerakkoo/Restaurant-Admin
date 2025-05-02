import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettlePage } from './settle.page';

const routes: Routes = [
  {
    path: '',
    component: SettlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlePageRoutingModule {}
