import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { userService } from '../service/userService.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, GoogleMap, MapInfoWindow, MapMarker, RouterLink,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
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
  chart: any = [];
  secondChart: any = [];
  labels: any;
  salesData: any;
  quantityData: any;


  constructor(public userService: userService) {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.info('Google Maps API is loading in dashboard.');
    }
    //this.userService.filterPurchasesByMonth()
    this.loadData();
  }

  async loadData() {
    await this.userService.userListSnap().then(() => {
      setTimeout(() => {
        console.log('revenues', this.userService.januaryRevenue, this.userService.februaryRevenue, this.userService.marchRevenue,)
        this.getChart();
      }, 1500);
    })
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {

  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, location: any) {
    infoWindow.open(marker);
    this.zoom = this.zoom + 1;
    this.center = location.position;
  }

  getChart() {
    this.labels = ['Jan', 'Feb', 'Mar', 'Apr'];
    this.salesData = {
      labels: this.labels,
      datasets: [{
        label: 'Sales in €',
        data: [this.userService.januaryRevenue,
        this.userService.februaryRevenue,
        this.userService.marchRevenue],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
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
        data: [this.userService.januaryQuantity, this.userService.februaryQuantity, this.userService.marchQuantity],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(201, 203, 207, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
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


