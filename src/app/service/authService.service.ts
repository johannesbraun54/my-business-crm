import { Injectable } from "@angular/core";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Account } from "../models/account.class";
import { FormControl, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    loggedIn: boolean = true;
    account = new Account();
    email = new FormControl('', [Validators.required, Validators.email]);

    constructor(private router: Router){
   
    }


    login(){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.account.email, this.account.password)
        .then( (userCredential) => {
          this.router.navigateByUrl('dashboard');
          this.loggedIn = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          console.error('login failed',errorCode);
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