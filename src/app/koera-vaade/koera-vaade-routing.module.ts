import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KoeraVaadePage } from './koera-vaade.page';

const routes: Routes = [
  {
    path: '',
    component: KoeraVaadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KoeraVaadePageRoutingModule {}
