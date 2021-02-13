import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportCrimePageRoutingModule } from './report-crime-routing.module';

import { ReportCrimePage } from './report-crime.page';
import {HomePageModule} from '../home/home.module';
import {CustomMapComponent} from '../components/custom-map/custom-map.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReportCrimePageRoutingModule,
        HomePageModule
    ],
  declarations: [ReportCrimePage, CustomMapComponent]
})
export class ReportCrimePageModule {}
