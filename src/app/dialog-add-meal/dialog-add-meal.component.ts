import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Meal } from '../models/meal.class';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dialog-add-meal',
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
  templateUrl: './dialog-add-meal.component.html',
  styleUrl: './dialog-add-meal.component.scss'
})
export class DialogAddMealComponent {
  loading = false;
  meal = new Meal();
  ingredient:any = [];
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef:MatDialogRef<DialogAddMealComponent>){

   }

   addIngredient(ingredientValue: string): void {
    if (ingredientValue.trim() !== '') {
        this.ingredient.push(ingredientValue);
        this.meal.ingredients = '';
        }
    }

  deleteIngredient(ingredient:string){
    let index = this.ingredient.indexOf(ingredient);
    this.ingredient.splice(index, 1);
  }

  saveMeal(){
    this.meal.price = Number(this.meal.price);
    this.meal.ingredients = this.ingredient;
    this.loading = true;
    addDoc(this.getMealsRef(), this.meal.toJson())
    .then(()=> {
      this.loading = false;
      this.dialogRef.close();
    })
  }

       

  getMealsRef(){
    return collection(this.firestore, 'meals');
  }
}
