import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { userService } from '../service/userService.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { Purchase } from '../models/purchase.class';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { AuthService } from '../service/authService.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    MatIcon,
    MatButtonModule,
    MatMenuModule,
    DialogAddUserComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    GoogleMapsModule,
    MatExpansionModule,
    RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  paramId: any;
  singleUser: any;
  user: User = new User();
  zoom = 7;
  center!: number;
  geocoder;
  location =
    { position: { lat: 53.131923, lng: 8.730445 }, title: 'Peter Altmaier', content: {} };
  panelOpenState = false;
  userPurchases: Purchase[] = [];
  totalAmountsFromUser: number[] = [];
  totalRevenue: number[] = [];

  constructor(public route: ActivatedRoute, public firestore: Firestore, public dialog: MatDialog, public userService: userService, public authService: AuthService) {
    this.authService.loggedIn = true
    this.paramId = this.route.snapshot.paramMap.get('id');
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.info('Google Maps API is loading in user-detail.');
    }

  }

  ngOnInit(): void {
    this.getUser(this.paramId);
    this.userService.filterPurchasesByMonth();
  }

  getUser(docId: string) {
    if (!this.userService.userDeleted) {
      this.singleUser = onSnapshot(this.getSingleDocRef(docId), (user) => {
        this.userPurchases = [];
        this.user = new User(user.data());
        this.userService.getSingleUserCoordinates(this.user);
        if (this.user.purchases.length > 0) {
            this.user.purchases[0].forEach((purchase: Purchase) => {
            this.userPurchases.push(purchase);
          })
          this.getTotalAmounts();
          this.getTotalPrice();
        }

      });
    }
  }

  getTotalPrice() {
    this.totalRevenue = [];
    for (let i = 0; i < this.userPurchases.length; i++) {
      const prices = this.userPurchases[i].prices;
      prices.forEach((price: number) => {
        this.totalRevenue.push(price);
      })
    }
    this.getTotalSumOfPrices();
  }

  getTotalSumOfPrices() {
    let sum = 0;
    for (let num of this.totalRevenue) {
      sum += num
    }
    return sum.toFixed(2).replace(".", ",")
  }

  getTotalAmounts() {
    this.totalAmountsFromUser = [];
    for (let i = 0; i < this.userPurchases.length; i++) {
      const amounts = this.userPurchases[i].amounts;
      amounts.forEach((amount: number) => {
        this.totalAmountsFromUser.push(amount);
      })
    }
    this.getAmountOfBoughtProducts()
  }

  getAmountOfBoughtProducts() {
    let sum = 0;
    for (let num of this.totalAmountsFromUser) {
      sum += num
    }
    return sum
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.paramId;
  }

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.paramId;
  }

  openDeleteDialog() {
    let dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.userId = this.paramId;
  }

  getSingleDocRef(docId: any) {
    return doc(collection(this.firestore, 'users'), docId);
  }
}

