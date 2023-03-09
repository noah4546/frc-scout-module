import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoutPage } from './scout.page';

const routes: Routes = [
  {
    path: '',
    component: ScoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoutPageRoutingModule {}
