import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: Firestore, useValue: {} },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
