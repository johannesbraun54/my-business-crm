import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { User } from '../models/user.class';
import { FormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';





@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogModule, 
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


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>){


  }

  ngOnInit(){}

  saveUser(){
    this.user.birthDate = this.birthDate?.getTime();
    this.loading = true;
    addDoc(this.getUserRef(), this.user.toJson())
    .catch((err) => {
      console.error(err)
    })
    .then((result:any) => {
      this.loading = false;
      this.dialogRef.close();
    })
    }

    getUserRef(){
      return collection(this.firestore, "users")
    }

  }





