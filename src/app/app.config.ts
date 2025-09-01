import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [MatDatepickerModule, provideRouter(routes),
     provideClientHydration(),
      provideAnimationsAsync(),
      provideFirebaseApp(() => initializeApp(
    {"projectId": "test-simple-crm",
    "appId":"1:158302719671:web:42384a3c9804679a578732",
    "storageBucket":"test-simple-crm.appspot.com",
    "apiKey":"AIzaSyCa0FVosKXicYGqHbbrMSEBCEqsJl5uUkY",
    "authDomain":"test-simple-crm.firebaseapp.com",
    "messagingSenderId":"158302719671"})),
    provideFirestore(() => getFirestore()), 
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    ],
};