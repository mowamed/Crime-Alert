import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'report-crime',
    loadChildren: () => import('../report-crime/report-crime.module').then( m => m.ReportCrimePageModule),
    canActivate: [AngularFireAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
