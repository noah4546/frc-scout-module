import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoutListPageRoutingModule } from './scout-list-routing.module';

import { ScoutListPage } from './scout-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoutListPageRoutingModule
  ],
  declarations: [ScoutListPage]
})
export class ScoutListPageModule {}
