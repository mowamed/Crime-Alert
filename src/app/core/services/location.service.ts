import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrimeLocation } from '../models/crimeLocation.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private afFire: AngularFirestore) {}

  /**
   * get current location using capacior
   */
  getCurrentPosition() {
    return Geolocation.getCurrentPosition();
  }

  /**
   * save a new crime location to Firestore
   * @param crimeLocation location of the crime
   */
  saveCrimeLocation(crimeLocation: CrimeLocation) {
    return this.afFire.doc(`/crimeLocations/${crimeLocation.id}`).set(
      {
        id: crimeLocation.id,
        longitude: crimeLocation.longitude,
        latitude: crimeLocation.latitude,
        report_number: firebase.firestore.FieldValue.increment(
          crimeLocation.report_number
        ),
      },
      { merge: true }
    );
  }

  /**
   * fetch the list of crime location from firestore
   */
  getCrimeLocations(): Observable<CrimeLocation[]> {
    return this.afFire.collection<CrimeLocation>('crimeLocations').valueChanges();
  }
}
