import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportCrimePageRoutingModule } from './report-crime-routing.module';

import { ReportCrimePage } from './report-crime.page';
import {CustomMapComponent} from '../components/custom-map/custom-map.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReportCrimePageRoutingModule
    ],
  declarations: [ReportCrimePage, CustomMapComponent]
})
export class ReportCrimePageModule {}
