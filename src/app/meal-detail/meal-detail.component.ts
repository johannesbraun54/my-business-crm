import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { Meal } from '../models/meal.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMealHeaderComponent } from '../dialog-edit-meal-header/dialog-edit-meal-header.component';
import { DialogEditMealDescriptionComponent } from '../dialog-edit-meal-description/dialog-edit-meal-description.component';
import { DialogEditMealIngredientsComponent } from '../dialog-edit-meal-ingredients/dialog-edit-meal-ingredients.component';
import { DialogDeleteProductComponent } from '../dialog-delete-product/dialog-delete-product.component';
import { userService } from '../service/userService.service';
import { AuthService } from '../service/authService.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-meal-detail',
    imports: [MatCardModule,
        CommonModule,
        MatIcon,
        MatButtonModule,
        MatMenuModule,
        DialogAddUserComponent,
        DialogEditAddressComponent,
        DialogEditUserComponent,
        RouterModule],
    templateUrl: './meal-detail.component.html',
    styleUrl: './meal-detail.component.scss'
})
export class MealDetailComponent {
  paramId: any;
  singleMeal: any;
  meal: Meal = new Meal();
  firestore: Firestore = inject(Firestore);

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public userService: userService, public authService: AuthService) {
    this.authService.loggedIn = true
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.getMeal(this.paramId);
  }

  getMeal(docId: string) {
    this.singleMeal = onSnapshot(this.getMealRef(docId), ((meal) => {
      this.meal = new Meal(meal.data());
    }))
  }

  getMealRef(docId: any) {
    return doc(collection(this.firestore, 'meals'), docId);
  }


  editMealHeader() {
    const dialog = this.dialog.open(DialogEditMealHeaderComponent);
    dialog.componentInstance.meal = new Meal(this.meal.toJson());
    dialog.componentInstance.mealId = this.paramId;
  }

  editMealDescription() {
    const dialog = this.dialog.open(DialogEditMealDescriptionComponent);
    dialog.componentInstance.meal = new Meal(this.meal.toJson());
    dialog.componentInstance.mealId = this.paramId;
    dialog.componentInstance.description = this.meal.description;
  }

  editMealIngredients() {
    const dialog = this.dialog.open(DialogEditMealIngredientsComponent);
    dialog.componentInstance.meal = new Meal(this.meal.toJson());
    dialog.componentInstance.mealId = this.paramId;
    this.meal.ingredients.forEach((ingredient: any) => {
      dialog.componentInstance.ingredients.push(ingredient);
    });
  }

  openDeleteDialog() {
    const dialog = this.dialog.open(DialogDeleteProductComponent);
    dialog.componentInstance.deleteMealId = this.paramId;
  }
}
