import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: 'folder',
    component: FolderPage
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./auth/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('./auth/partners/partners.module').then( m => m.PartnersPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./auth/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'delivery-boy',
    loadChildren: () => import('./auth/delivery-boy/delivery-boy.module').then( m => m.DeliveryBoyPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./auth/customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./auth/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'promo-code',
    loadChildren: () => import('./auth/promo-code/promo-code.module').then( m => m.PromoCodePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./auth/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dash',
    loadChildren: () => import('./dash/dash.module').then( m => m.DashPageModule)
  },

  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then( m => m.BannerPageModule)
  },
  {
    path: 'pincode',
    loadChildren: () => import('./pincode/pincode.module').then( m => m.PincodePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./auth/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./auth/messages/messages.module').then( m => m.MessagesPageModule)
  },


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
