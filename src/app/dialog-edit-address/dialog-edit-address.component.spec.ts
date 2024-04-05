import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditAddressComponent } from './dialog-edit-address.component';
import {  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAddressComponent, BrowserAnimationsModule],
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
    
    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
