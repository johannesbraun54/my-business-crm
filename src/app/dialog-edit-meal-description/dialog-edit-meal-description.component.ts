import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Meal } from '../models/meal.class';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-dialog-edit-meal-description',
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
  templateUrl: './dialog-edit-meal-description.component.html',
  styleUrl: './dialog-edit-meal-description.component.scss'
})
export class DialogEditMealDescriptionComponent {
  mealId!: string;
  meal = new Meal();
  loading = false;
  description!: string;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditMealDescriptionComponent>) { }

  ngOnInit() {

  }

  async saveMeal() {
    this.meal.showTextField = false;
    this.meal.price = Number(this.meal.price);
    this.meal.remark = "";
    this.loading = true;
    let docRef = this.getSingleMealRef(this.mealId)
    await updateDoc(docRef, this.meal.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }

  getSingleMealRef(docId: string) {
    return doc(collection(this.firestore, 'meals'), docId)
  }
}
