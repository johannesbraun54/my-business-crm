import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMealIngredientsComponent } from './dialog-edit-meal-ingredients.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditMealIngredientsComponent', () => {
  let component: DialogEditMealIngredientsComponent;
  let fixture: ComponentFixture<DialogEditMealIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditMealIngredientsComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        {
          provide: userService,
          useValue: {}
        },
        { provide: Firestore, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogEditMealIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
