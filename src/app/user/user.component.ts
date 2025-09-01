import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { userService } from '../service/userService.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../service/authService.service';

interface Filter {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-user',
    imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatCardModule,
        RouterLink,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  contentloaded = false;
  selectedValue!: string;
  fireStore: Firestore = inject(Firestore);
  filters: Filter[] = [
    { value: 'salesUp-1', viewValue: 'Umsatz (aufsteigend)' },
    { value: 'salesDown-2', viewValue: 'Umsatz (absteigend)' },
    { value: 'purchasesUp-3', viewValue: 'Käufe (aufsteigend)' },
    { value: 'purchasesDown-4', viewValue: 'Käufe (absteigend)' },
  ];

  constructor(public dialog: MatDialog, public userService: userService, public authService: AuthService) {
    this.authService.loggedIn = true
  }
  ngOnInit(): void {
    this.userService.userListSnap();
    if (this.userService.contentloaded) {
      this.userService.searchUserDetail();
    }

  }




  getFilter(filter: string) {
    console.log('get Filter', filter);
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
