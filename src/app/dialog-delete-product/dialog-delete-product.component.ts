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
  selector: 'app-dialog-delete-product',
  standalone: true,
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
  templateUrl: './dialog-delete-product.component.html',
  styleUrl: './dialog-delete-product.component.scss'
})
export class DialogDeleteProductComponent {
  loading = false;
  deleteMealId!:string;
  firestore:Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogDeleteProductComponent>,
    private router:Router, public userService:userService) {

   }


  async deleteMeal() {
    this.userService.mealDeleted = true;
    this.loading = true
    await deleteDoc(this.getSingleMealRef()).catch(err => {
      console.error(err);
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
      this.router.navigate(['/products']);
    })
  }


  getMealsRef() {
    return collection(this.firestore, 'meals');
  }

  getSingleMealRef() {
    let collRef = this.getMealsRef();
    return doc(collRef,this.deleteMealId);
  }

}
