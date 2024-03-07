import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: MealDetailComponent },
    { path: 'imprint', component: ImprintComponent }

];
