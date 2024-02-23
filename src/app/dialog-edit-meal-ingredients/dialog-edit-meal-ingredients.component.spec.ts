import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMealIngredientsComponent } from './dialog-edit-meal-ingredients.component';

describe('DialogEditMealIngredientsComponent', () => {
  let component: DialogEditMealIngredientsComponent;
  let fixture: ComponentFixture<DialogEditMealIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditMealIngredientsComponent]
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
