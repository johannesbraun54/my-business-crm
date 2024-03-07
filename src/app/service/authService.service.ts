import { Injectable } from "@angular/core";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Account } from "../models/account.class";
import { FormControl, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    loggedIn: boolean = false;
    account = new Account();
    email = new FormControl('', [Validators.required, Validators.email]);
    logginFailed = false
    loading = false;
    constructor(private router: Router){
   
    }


    login(){
        const auth = getAuth();
        this.loading = true;
        signInWithEmailAndPassword(auth, this.account.email, this.account.password)
        .then( (userCredential) => {
          this.logginFailed = false;
          this.router.navigateByUrl('dashboard');
          this.loggedIn = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.logginFailed = true; 
        });
    }

    createAccount(){
      const auth = getAuth();
      
      createUserWithEmailAndPassword(auth, this.account.email,this.account.password)
      .then((userCredential) => {
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        console.error('sign up failed',error)
      });
  
    }
}