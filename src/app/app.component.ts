import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './service/authService.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet,
            MatSidenavModule,
            MatToolbarModule,
            MatIconModule,
            RouterModule,
            MatDatepickerModule,
            MatNativeDateModule]
            ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MatDatepickerModule],
})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);

  constructor(public authService: AuthService){

  }
}