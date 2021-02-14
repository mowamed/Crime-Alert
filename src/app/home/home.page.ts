import { Component, OnInit } from '@angular/core';
import { LocationService } from '../core/services/location.service';
import { MapsService } from '../core/services/maps.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private locationService: LocationService,
    private mapsService: MapsService
  ) {}

  ngOnInit() {}

  setCurrentLocation() {
    this.locationService.getCurrentPosition().then((position) => {
      const latLng = position.coords.latitude + '' + position.coords.longitude;
      const coordinate = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.mapsService.createPlaceMarker(latLng.toString(), coordinate);
    });
  }
}
