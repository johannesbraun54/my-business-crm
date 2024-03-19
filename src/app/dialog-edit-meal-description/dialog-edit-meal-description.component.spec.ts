import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMealDescriptionComponent } from './dialog-edit-meal-description.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditMealDescriptionComponent', () => {
  let component: DialogEditMealDescriptionComponent;
  let fixture: ComponentFixture<DialogEditMealDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditMealDescriptionComponent, BrowserAnimationsModule],
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
    
    fixture = TestBed.createComponent(DialogEditMealDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
