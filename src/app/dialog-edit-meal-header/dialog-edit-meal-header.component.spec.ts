import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMealHeaderComponent } from './dialog-edit-meal-header.component';

describe('DialogEditMealHeaderComponent', () => {
  let component: DialogEditMealHeaderComponent;
  let fixture: ComponentFixture<DialogEditMealHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditMealHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditMealHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
