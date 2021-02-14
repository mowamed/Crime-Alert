import { Component, OnInit } from '@angular/core';
import { LocationService } from '../core/services/location.service';
import { GeolocationPosition } from '@capacitor/core';
import { MapsService } from '../core/services/maps.service';
import {CrimeLocation} from '../core/models/crimeLocation.model';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-report-crime',
  templateUrl: './report-crime.page.html',
  styleUrls: ['./report-crime.page.scss'],
})
export class ReportCrimePage implements OnInit {
  currentPosition: GeolocationPosition;
  searchQuery: string;
  crimeLocation: CrimeLocation;

  constructor(
    private locationService: LocationService,
    private mapsService: MapsService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.locationService.getCurrentPosition().then((position) => {
      this.currentPosition = position;
    });
  }


  onSearch() {
    if (!this.searchQuery) {
      return;
    }
    this.mapsService
      .getAddressFromSearchTerm(this.searchQuery)
      .then((result) => {
        this.crimeLocation = result;
      }).catch(error => console.log(error));
  }

  useCurrentLocation() {
    this.mapsService
      .getAddressFromCurrentPosition(this.currentPosition)
      .then((result) => {
        this.crimeLocation = result;
      }).catch(error => console.log(error));
  }

  saveCrime() {
    if (this.crimeLocation) {
      this.locationService.saveCrimeLocation(this.crimeLocation);
    }
    this.navCtrl.pop();
  }
}
