import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.scss'],
})
export class CustomMapComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  @Input() markers: any[] = [];

  constructor() {}

  ngOnInit() {
    // wait after component initialisation before to load the map
    setTimeout(() => {
      this.loadMap();
    }, 200);
  }

  // Initialize map
  loadMap() {
    const latLng = new google.maps.LatLng(5.6488615, -0.1374539);

    const mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
