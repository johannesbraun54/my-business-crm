import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteProductComponent } from './dialog-delete-product.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogDeleteProductComponent', () => {
  let component: DialogDeleteProductComponent;
  let fixture: ComponentFixture<DialogDeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteProductComponent, MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: Firestore, useValue: {} },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
