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
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-edit-address',
    imports: [MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatProgressBarModule,
        NgIf,
        CommonModule],
    templateUrl: './dialog-edit-address.component.html',
    styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user = new User();
  userId!: string;
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);
  coordinatesChecked!: boolean;
  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, public userService: userService) {

  }

  async saveUser() {
    this.loading = true;
    let useradress = this.user.street + this.user.city + this.user.zipCode;
    await this.userService.checkCoordinatesFromNewUser(useradress, this.user).then(() => {
      this.coordinatesChecked = true
      this.formPurchasesToJson();
      this.updateUser();
    });
  }

  formPurchasesToJson() {
    if (this.user.purchases.length > 0) {
      this.userService.getPurchaseToJson(this.user);
      this.user.purchases = this.userService.arrayForPurchasesUpdate
      this.userService.getTotalRevenue(this.user);
      this.userService.getTotalPurchaseFromUser(this.user);
    }
  }

  async updateUser() {
    let docRef = this.getSingleDocRef(this.userId);
    if (this.userService.correctCoordinates) {
      await updateDoc(docRef, this.user.toJson())
        .then(() => {
          this.loading = false;
          this.dialogRef.close();
        });
    } else {
      this.loading = false;
    }
    this.userService.correctCoordinates = false;
  }

  getSingleDocRef(docId: any) {
    return doc(collection(this.firestore, 'users'), docId);
  }

}
