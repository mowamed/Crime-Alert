import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);
  currentUser: User | null;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState
      .pipe(
        map((firebaseUser) =>
          firebaseUser
            ? ({
                id: firebaseUser.uid,
                name: firebaseUser.displayName,
                email: firebaseUser.email,
              } as User)
            : null
        )
      )
      .subscribe((user) => {
        this.currentUser = user;
        this.authenticationState.next(!!user);
      });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  login() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.signOut();
  }
}
