import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../service/authService.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@Component({
    selector: 'app-sign-up',
    imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatProgressBarModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loading = false;


  constructor(public authService: AuthService) {
    this.authService.animateFirstTime = true;
   }

  createAccount(signupForm:NgForm) {
    if(signupForm.valid && signupForm.submitted){
      console.log(this.authService.account)
      this.authService.createAccount()
    }

  }





  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
