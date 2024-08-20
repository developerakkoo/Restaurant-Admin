import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnersPage } from './partners.page';

const routes: Routes = [
  {
    path: '',
    component: PartnersPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'map/:id',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'hotels/:lat/:lng',
    loadChildren: () => import('./hotels/hotels.module').then( m => m.HotelsPageModule)
  },
  {
    path: 'dish',
    loadChildren: () => import('./dish/dish.module').then( m => m.DishPageModule)
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnersPageRoutingModule {}
