import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMealDescriptionComponent } from './dialog-edit-meal-description.component';

describe('DialogEditMealDescriptionComponent', () => {
  let component: DialogEditMealDescriptionComponent;
  let fixture: ComponentFixture<DialogEditMealDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditMealDescriptionComponent]
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
