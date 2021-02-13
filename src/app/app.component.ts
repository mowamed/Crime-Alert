import { Component } from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.authenticationState.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
