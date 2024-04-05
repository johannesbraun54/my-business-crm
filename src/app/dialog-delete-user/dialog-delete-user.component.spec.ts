import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteUserComponent } from './dialog-delete-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';

describe('DialogDeleteUserComponent', () => {
  let component: DialogDeleteUserComponent;
  let fixture: ComponentFixture<DialogDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteUserComponent],
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
    
    fixture = TestBed.createComponent(DialogDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
