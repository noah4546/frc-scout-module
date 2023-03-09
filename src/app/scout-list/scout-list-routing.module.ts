import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoutListPage } from './scout-list.page';

const routes: Routes = [
  {
    path: '',
    component: ScoutListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoutListPageRoutingModule {}
