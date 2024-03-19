import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealDetailComponent } from './meal-detail.component';
import { RouterModule } from '@angular/router';
import { userService } from '../service/userService.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';

describe('MealDetailComponent', () => {
  let component: MealDetailComponent;
  let fixture: ComponentFixture<MealDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDetailComponent, RouterModule.forRoot([]), BrowserAnimationsModule, collection, doc, onSnapshot],
      providers: [
        { provide: userService, useValue: {} },
        { provide: Firestore, useValue: {} },
        'collection',
        'doc',
        'onSnapshot',
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
