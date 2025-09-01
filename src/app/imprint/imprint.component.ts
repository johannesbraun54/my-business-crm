import { Component } from '@angular/core';
import { AuthService } from '../service/authService.service';

@Component({
    selector: 'app-imprint',
    imports: [],
    templateUrl: './imprint.component.html',
    styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  constructor(public authService: AuthService) {
    this.authService.loggedIn = true
  }
}
