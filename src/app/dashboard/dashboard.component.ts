import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { userService } from '../service/userService.service';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, GoogleMap, MapInfoWindow, MapMarker,RouterLink,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  allUsers:any = [];
  latitude!: number;
  longitude!: number;
  userName!: string;
  @ViewChild ('newMap', {static : false })newMap!: ElementRef;
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  @ViewChild ('marker',{ static : false})marker!: ElementRef;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 52.36932553544425, lng: 8.618208610671102 };
  geocoder;
  zoom = 7;
  chart: any = []

  constructor(public userService: userService){
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.info('Google Maps API is loading in dashboard.');
    }
  }

  ngOnInit(): void {
    //this.getChart()
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, location:any) {
    infoWindow.open(marker);
    this.zoom = this.zoom + 1;
    this.center = location.position;
}

getChart(){
   this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }



}


