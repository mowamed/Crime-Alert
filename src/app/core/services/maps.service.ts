import { ElementRef, Injectable } from '@angular/core';
import { GeolocationPosition } from '@capacitor/core';
import { CrimeLocation } from '../models/crimeLocation.model';

declare var google;

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  map: any;
  markersRef = {};
  currentPositionRef;

  constructor() {}

  /**
   * initialise a new google maps object
   * @param currentPosition
   * @param mapsRef
   */
  loadMap(currentPosition: GeolocationPosition, mapsRef: ElementRef) {
    // initialize map with user current location or use Accra
    const lat = currentPosition ? currentPosition.coords.latitude : '5.6488615';
    const long = currentPosition
      ? currentPosition.coords.longitude
      : '-0.1374539';
    const latLng = new google.maps.LatLng(lat, long);

    const mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(mapsRef.nativeElement, mapOptions);
    return this.map;
  }

  /**
   * find the nearest place based on search term using Google Maps Autocomplete Services API
   * @param searchTerm the term to search for
   */
  getAddressFromSearchTerm(searchTerm: string): Promise<CrimeLocation> {
    return new Promise((resolve, reject) => {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: searchTerm },
        async (predictions, status) => {
          if (status === 'OK') {
            if (predictions[0]) {
              const place = await this.getPlaceDetails(predictions[0].place_id);
              resolve(place);
            } else {
              reject('No results found');
            }
          } else {
            reject('AutocompleteService failed due to: ' + status);
          }
        }
      );
    });
  }

  /**
   * find the nearest place based on gps coordinates using Google Maps Geocoder API
   * @param currentLocation gps coordinates
   */
  getAddressFromCurrentPosition(
    currentLocation: GeolocationPosition
  ): Promise<CrimeLocation> {
    return new Promise((resolve, reject) => {
      const latLng = {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      };

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, async (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const place = await this.getPlaceDetails(results[0].place_id);
            resolve(place);
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }

  /**
   * get additional information about a place using Google maps Places Services
   * @param placeId the id of the place
   */
  getPlaceDetails(placeId: string): Promise<CrimeLocation> {
    return new Promise((resolve, reject) => {
      const request = {
        placeId,
        fields: ['name', 'geometry'],
      };
      const placesService = new google.maps.places.PlacesService(this.map);

      placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.createPlaceMarker(placeId, place.geometry.location);
          const placeResult: CrimeLocation = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            id: placeId,
            name: place.name,
            report_number: 1,
          };
          resolve(placeResult);
        } else {
          reject('not found');
        }
      });
    });
  }

  /**
   * add current location blue pin to map
   * @param placeId id of the place
   * @param position latitude and longitude of the location
   */
  createPlaceMarker(placeId: string, position: any): void {
    this.clearPlaceMarker(placeId);
    const marker = new google.maps.Marker({
      map: this.map,
      position,
      icon: 'assets/imgs/current-location.png',
    });
    this.map.panTo(marker.getPosition());
    this.map.setZoom(18);
    this.markersRef[placeId] = marker;
  }

  clearPlaceMarker(placeId: string) {
    if (this.markersRef[placeId]) {
      this.markersRef[placeId].setMap(null);
    }
  }

  /**
   * add a list of crime locations to map
   * @param markers list of locations
   */
  addMarkersToMap(markers: CrimeLocation[]) {
    markers.forEach((crimeLocation) => {
      // delete same markers from map before add
      this.clearPlaceMarker(crimeLocation.id);

      const image = this.getMarkerIcon(crimeLocation.report_number);
      this.markersRef[crimeLocation.id] = new google.maps.Marker({
        map: this.map,
        position: { lat: crimeLocation.latitude, lng: crimeLocation.longitude },
        icon: image,
      });
    });
  }

  /**
   * get location icon based on crime number
   * @param reportNumber crime numbers
   */
  getMarkerIcon(reportNumber: number) {
    if (reportNumber < 5) {
      return 'assets/imgs/marker-green.png';
    } else if (reportNumber > 5 && reportNumber < 20) {
      return 'assets/imgs/marker-orange.png';
    } else {
      return 'assets/imgs/marker-red.png';
    }
  }
}
