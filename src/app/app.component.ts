import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
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
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(public authService: AuthService) {

  }

  isDrawerOpened(): boolean {
    return this.drawer.opened ? true : false
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 1000 && this.isDrawerOpened()) {
      this.drawer.close();
    }

    if(window.innerWidth > 1000 && !this.isDrawerOpened()) {
      this.drawer.open();
    }
  }

}