import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { userService } from '../service/userService.service';

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

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, public userService: userService) {

  }

  async saveUser() {
    this.userService.getPurchaseToJson(this.user);
    this.user.purchases = this.userService.arrayForPurchasesUpdate
    this.userService.getTotalRevenue(this.user);
    this.userService.getTotalPurchaseFromUser(this.user);
    this.loading = true;
    let docRef = this.getSingleDocRef(this.userId);
    await updateDoc(docRef, this.user.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }
  getSingleDocRef(docId: any) {
    return doc(collection(this.firestore, 'users'), docId);
  }

}
