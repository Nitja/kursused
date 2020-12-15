import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KoeraVaadePageRoutingModule } from './koera-vaade-routing.module';

import { KoeraVaadePage } from './koera-vaade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KoeraVaadePageRoutingModule
  ],
  declarations: [KoeraVaadePage]
})
export class KoeraVaadePageModule {}
