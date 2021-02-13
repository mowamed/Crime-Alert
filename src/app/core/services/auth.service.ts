import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor() { }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
