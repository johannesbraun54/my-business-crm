import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { GoogleMapsModule } from '@angular/google-maps';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, RouterModule.forRoot([]), GoogleMapsModule],
      providers: [{
        provide: userService,
        useValue: {}
      },
      { provide: Firestore, useValue: {} },
      { provide: GoogleMapsModule, useValue: {}}
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
