import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealDetailComponent } from './meal-detail.component';
import { RouterModule } from '@angular/router';
import { userService } from '../service/userService.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('MealDetailComponent', () => {
  let component: MealDetailComponent;
  let fixture: ComponentFixture<MealDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDetailComponent, RouterModule.forRoot([]), BrowserAnimationsModule,],
      providers: [
        { provide: userService, useValue: {} },
        { provide: Firestore, useValue: {} },
        importProvidersFrom(provideFirebaseApp(() => initializeApp(
          {"projectId": "test-simple-crm",
          "appId":"1:158302719671:web:42384a3c9804679a578732",
          "storageBucket":"test-simple-crm.appspot.com",
          "apiKey":"AIzaSyCa0FVosKXicYGqHbbrMSEBCEqsJl5uUkY",
          "authDomain":"test-simple-crm.firebaseapp.com",
          "messagingSenderId":"158302719671"})))
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
