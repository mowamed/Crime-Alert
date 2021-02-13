import { Component, ElementRef, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  constructor() {}

  ionViewWillEnter() {
    this.loadMap();
  }

  // Initialize a blank map
  loadMap() {
    const latLng = new google.maps.LatLng(5.6488615, -0.1374539);

    const mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
