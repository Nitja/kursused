import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailViewPageRoutingModule } from './detail-view-routing.module';

import { DetailViewPage } from './detail-view.page';

//import { NgGitCalendarModule } from '../../../ng-git-calendar/src/lib/ng-git-calendar.module';
//import { NgGitCalendarModule } from 'ng-git-calendar/lib/ng-git-calendar.module';
import { NgGitCalendarModule } from '../../lib/ng-git-calendar.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailViewPageRoutingModule,
    NgGitCalendarModule,
    TranslateModule  
  ],
  declarations: [DetailViewPage]
})
export class DetailViewPageModule {}
