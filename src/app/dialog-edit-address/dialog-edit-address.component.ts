import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    NgIf],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user = new User();
  userId!: string;
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);

constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){
  
}

async saveUser(){
  this.loading = true;
  let docRef = this.getSingleDocRef(this.userId);
  await updateDoc(docRef, this.user.toJson())
  .then(() => {
    this.loading = false;
    this.dialogRef.close();
  });
}

getSingleDocRef(docId:any){
  return doc(collection(this.firestore, 'users'), docId);
}

}
