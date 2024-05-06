import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { userService } from '../service/userService.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { AuthService } from '../service/authService.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, GoogleMap, MapInfoWindow, MapMarker, RouterLink,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  latitude!: number;
  longitude!: number;
  userName!: string;
  @ViewChild('newMap', { static: false }) newMap!: ElementRef;
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  @ViewChild('marker', { static: false }) marker!: ElementRef;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 52.36932553544425, lng: 8.618208610671102 };
  geocoder;
  zoom = 7;
  chart: Chart | null = null;
  secondChart: Chart | null = null;
  labels: any;
  salesData: any;
  quantityData: any;
  unsubUserList!: any;

  statsBorderColors: string[] = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'];
  statsBackgroundColors: string[] = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)']
  private ngUnsubscribe;

  constructor(public userService: userService, public authService: AuthService, private router: Router) {
    this.authService.loggedIn = true;
    this.authService.animateFirstTime = true
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined' && google) {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.info('Google Maps API is loading in dashboard.');
    }
    this.ngUnsubscribe = new Subject();
  }

  ngAfterViewInit(): void {

  }

  async ngOnInit() {
    this.userService.userListSnap();
    this.userService.allUsersSubject.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.getChart();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe = new Subject();
  }



  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, location: any) {
    infoWindow.open(marker);
    this.zoom = this.zoom + 1;
    this.center = location.position;
  }

  getChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.secondChart) {
      this.secondChart.destroy();
    }
    this.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai'];
    this.salesData = {
      labels: this.labels,
      datasets: [{
        label: 'Sales in €',
        data: [this.userService.januaryRevenue,
        this.userService.februaryRevenue,
        this.userService.marchRevenue,
        this.userService.aprilRevenue,
        this.userService.mayRevenue],
        backgroundColor: this.statsBackgroundColors,
        borderColor: this.statsBorderColors,
        borderWidth: 1
      }]
    };

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: this.salesData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });


    this.quantityData = {
      labels: this.labels,
      datasets: [{
        label: 'Verkaufte Produkte in Stück',
        data: [this.userService.januaryQuantity,
        this.userService.februaryQuantity,
        this.userService.marchQuantity,
        this.userService.aprilQuantity,
        this.userService.mayQuantity],
        backgroundColor: this.statsBackgroundColors,
        borderColor: this.statsBorderColors,
        borderWidth: 1
      }]
    };

    this.secondChart = new Chart('secondCanvas', {
      type: 'bar',
      data: this.quantityData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

}


