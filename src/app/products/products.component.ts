import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DialogAddMealComponent } from '../dialog-add-meal/dialog-add-meal.component';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { userService } from '../service/userService.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Meal } from '../models/meal.class';
import { AuthService } from '../service/authService.service';

@Component({
    selector: 'app-products',
    imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatCardModule,
        RouterLink,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
  firestore: Firestore = inject(Firestore);
  mealsnap;
  allMeals: Meal[] = [];
  searchedMeals: Meal[] = [];
  searchTerm!: string;
  mealId!:string;
  constructor(public dialog: MatDialog, public userService: userService, public authService:AuthService) {
    this.authService.loggedIn = true
    this.mealsnap = onSnapshot(this.getMealsRef(), (mealslist) => {
      this.allMeals = [];
      mealslist.forEach(meal => {
        let mealId = meal.get('mealId');
        mealId = meal.id;
        const mealData = meal.data() as Meal;
        mealData['mealId'] = mealId;
        this.mealId = mealId;
        this.allMeals.push(mealData);
        if (this.searchTerm == undefined) {
          this.searchedMeals = this.allMeals;
        }
      })
    })
  }

  searchProduct() {
    this.searchedMeals = this.allMeals.filter(meal => {
      return meal.mealName.toLowerCase().includes(this.searchTerm.trim().toLowerCase());
    })
  }



  openDialog() {
    this.dialog.open(DialogAddMealComponent);
  }

  getMealsRef() {
    return collection(this.firestore, 'meals');
  }

  getSingleMealRef() {
    let collRef = this.getMealsRef();
    return doc(collRef,)
  }
}
