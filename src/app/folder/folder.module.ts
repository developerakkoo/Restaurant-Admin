import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanvasJSAngularChartsModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
