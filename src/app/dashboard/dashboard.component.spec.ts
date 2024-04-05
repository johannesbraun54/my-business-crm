import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { userService } from '../service/userService.service';
import { Firestore } from '@angular/fire/firestore';
import { GoogleMap, GoogleMapsModule, MapGeocoder, MapInfoWindow, MapMarker } from '@angular/google-maps';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, GoogleMapsModule, GoogleMap, MapInfoWindow, MapMarker],
      providers: [{
        provide: userService,
        useValue: {}
      },
      { provide: Firestore, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
