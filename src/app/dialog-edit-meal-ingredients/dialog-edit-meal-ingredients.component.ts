import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Meal } from '../models/meal.class';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dialog-edit-meal-ingredients',
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
    MatIcon,
    MatIconModule],
  templateUrl: './dialog-edit-meal-ingredients.component.html',
  styleUrl: './dialog-edit-meal-ingredients.component.scss'
})
export class DialogEditMealIngredientsComponent {
  mealId!:string;
  meal = new Meal();
  loading = false;
  ingredients:any = [];
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditMealIngredientsComponent>){}

  ngOnInit(){

  }

  async saveMeal(){
    this.loading = true;
    this.meal.showTextField = false;
    this.meal.price = Number(this.meal.price);
    this.meal.remark = "";
    this.meal.ingredients = this.ingredients;
    let docRef = this.getSingleMealRef(this.mealId)
    await updateDoc(docRef, this.meal.toJson())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

  getSingleMealRef(docId:string){
      return doc(collection(this.firestore, 'meals'), docId)
  }

  addIngredient(ingredientValue: string): void {
    if (ingredientValue.trim() !== '') {
        this.ingredients.push(ingredientValue);
        this.meal.ingredients = '';
        }
    }

  deleteIngredient(ingredient:string){
    let index = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(index, 1);
  }
}
