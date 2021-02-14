import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MapsService } from '../../core/services/maps.service';
import { Subscription } from 'rxjs';
import { LocationService } from '../../core/services/location.service';

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.scss'],
})
export class CustomMapComponent implements OnInit, OnDestroy {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  subscriptions$: Subscription = new Subscription();

  constructor(
    private mapsService: MapsService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    // wait after component initialisation before to load the map
    setTimeout(() => {
      this.loadMap();
      this.loadMarkers();
    }, 20);
  }

  loadMarkers() {
    this.subscriptions$.add(
      this.locationService.getCrimeLocations().subscribe((markers) => {
        this.mapsService.addMarkersToMap(markers);
      })
    );
  }

  // Initialize map
  loadMap() {
    this.locationService.getCurrentPosition().then((position) => {
      this.map = this.mapsService.loadMap(position, this.mapElement);
    });
  }

  // unsubscribe from observables
  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
