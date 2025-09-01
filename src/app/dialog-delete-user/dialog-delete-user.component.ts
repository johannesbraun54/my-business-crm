import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { userService } from '../service/userService.service';

@Component({
    selector: 'app-dialog-delete-user',
    imports: [CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatProgressBarModule,
        NgIf,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIcon],
    templateUrl: './dialog-delete-user.component.html',
    styleUrl: './dialog-delete-user.component.scss'
})
export class DialogDeleteUserComponent {
  userId!: string;
  userName!: string;
  loading = false;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>, public userService: userService, private router: Router) { }


  async deleteUser() {
    this.loading = true;
    this.userService.userDeleted = true;
    this.router.navigate(['/user']);
    await deleteDoc(doc(this.userService.getUserRef(), this.userId)).catch(err => {
      console.error(err)
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
      this.userService.userDeleted = false;

    })
  }
}
