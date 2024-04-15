import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { userService } from '../service/userService.service';




@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',

})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);
  coordinatesChecked = false;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userService: userService) {

  }

  ngOnInit() { }

  async getUser() {
    this.user.birthDate = this.birthDate?.getTime();
    this.loading = true;
    let useradress = this.user.zipCode + this.user.city + this.user.street;
    await this.userService.checkCoordinatesFromNewUser(useradress, this.user);
    this.saveUser();
    this.coordinatesChecked = true;
  }

  saveUser() {
    if (this.userService.correctCoordinates) {
      addDoc(this.getUserRef(), this.user.toJson())
        .catch((err) => {
          console.error(err)
        })
        .then((result: any) => {
          this.loading = false;
          this.dialogRef.close();
        })
    } else {
      this.userService.correctCoordinates = false;
      this.loading = false;
    }
  }

  getUserRef() {
    return collection(this.firestore, "users")
  }

}





