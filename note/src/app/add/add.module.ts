import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddPageRoutingModule } from "./add-routing.module";

import { AddPage } from "./add.page";
import { Autosize } from "../shared/autosize.directive";
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [AddPage, Autosize],
  providers: [Autosize]
})
export class AddPageModule {}
