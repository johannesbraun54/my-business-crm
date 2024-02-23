import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMealComponent } from './dialog-add-meal.component';

describe('DialogAddMealComponent', () => {
  let component: DialogAddMealComponent;
  let fixture: ComponentFixture<DialogAddMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddMealComponent]
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
