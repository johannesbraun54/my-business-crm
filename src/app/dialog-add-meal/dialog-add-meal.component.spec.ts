import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMealComponent } from './dialog-add-meal.component';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddMealComponent', () => {
  let component: DialogAddMealComponent;
  let fixture: ComponentFixture<DialogAddMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddMealComponent, MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: Firestore, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
