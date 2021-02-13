import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCrimePage } from './report-crime.page';

const routes: Routes = [
  {
    path: '',
    component: ReportCrimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportCrimePageRoutingModule {}
