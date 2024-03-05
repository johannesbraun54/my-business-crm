import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.class";
import { Firestore, collection, onSnapshot, query, where } from '@angular/fire/firestore';
import { Meal } from "../models/meal.class";
import { Purchase } from "../models/purchase.class";
import { Location } from "../models/locations.class";

@Injectable({
  providedIn: 'root'
})

export class userService {
  user = new User();
  allUsers: User[] = []
  searchedUsers: User[] = [];
  userPurchases: Purchase[] = [];
  totalAmountsFromUser: number[] = [];
  totalRevenue: number[] = [];
  searchTerm!: string;
  geocoder;   //= new google.maps.Geocoder();
  position = { lat: 0.0, lng: 0.0 };
  unsubUser;
  mealDeleted = false;
  userDeleted = false;
  contentloaded = false;
  newlocation = new Location();
  locations: Location[] = [];

  //location = [{
  //position: { lat: 0.0, lng: 0.0 }, title: 'Peter Altmaier'
  //}]


  constructor(public firestore: Firestore) {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.info('Google Maps API is loading.');
    }
    this.unsubUser = this.userListSnap();
  }

  async userListSnap() {
    return onSnapshot(this.getUserRef(), (userList) => {
      this.allUsers = [];
      this.locations = [];
      userList.forEach(userSnap => {
        let customUserId = userSnap.get('customUserId');
        customUserId = userSnap.id;
        const userData: User = userSnap.data() as User
        userData['customUserId'] = customUserId;
        const userAdress = userData['zipCode'] + userData['city'] + userData['street'];
        this.allUsers.push(userData);
        this.getUserCoordinates(userAdress, userData);
        if (this.searchTerm == undefined) {
          this.searchedUsers = this.allUsers;
        }
      })
      this.contentloaded = true
    })
  }


  searchUserDetail() {
    this.searchedUsers = this.allUsers.filter((user: User) => {
      if (this.searchCommandIsFound(user)) {
        return true
      } else {
        return false
      }
    });
  }

  searchCommandIsFound(user: User) {
    if (this.searchTerm) {
      return (
        user.firstName.toLowerCase().includes(this.searchTerm.trim().toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.trim().toLowerCase()) ||
        user.city.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    } else {
      return false;
    }
  }


  structurateUserData(myFilter: string) {
    for (let i = 0; i < this.allUsers.length; i++) {
      let sum = 0;
      const user = this.allUsers[i];
      this.getTotalRevenue(user, sum);
      this.getTotalPurchaseFromUser(user)
    }
    this.filterUser(myFilter)
  }

  getTotalRevenue(user: User, sum: number) {
    for (let j = 0; j < user.purchases.length; j++) {
      const purchase = user.purchases[j];
      sum += purchase.totalAmount
      user.totalRevenue = sum
    }
  }

  getTotalPurchaseFromUser(user: User) {
    let sum = 0;
    for (let j = 0; j < user.purchases.length; j++) {
      const purchase = user.purchases[j];
      for (let k = 0; k < purchase.amounts.length; k++) {
        const amount = purchase.amounts[k];
        sum += amount
      }
      user.totalPurchasesAmount = sum
    }
  }


  filterUser(myFilter: string) {
    switch (myFilter) {
      case 'salesUp-1':
        this.filterSalesUp();
        break;
      case 'salesDown-2':
        this.filterSalesDown();
        break;
      case 'purchasesUp-3':
        this.filterPurchasesUp();
        break;
      case 'purchasesDown-4':
        this.filterPurchasesDown();
        break;
    }
  }

  filterSalesUp() {
    this.searchedUsers.sort((a: User, b: User) => {
      if (a.totalRevenue && b.totalRevenue) {
        return a.totalRevenue - b.totalRevenue;
      } else {
        return a.totalRevenue ? 1 : -1;
      }
    });
  }

  filterSalesDown() {
    this.searchedUsers.sort((a: User, b: User) => {
      if (a.totalRevenue && b.totalRevenue) {
        return b.totalRevenue - a.totalRevenue
      } else {
        return a.totalRevenue ? -1 : 1;
      }
    });
  }

  filterPurchasesUp() {
    this.searchedUsers.sort((a: User, b: User) => {
      if (a.totalPurchasesAmount && b.totalPurchasesAmount) {
        return a.totalPurchasesAmount - b.totalPurchasesAmount
      } else {
        return a.totalPurchasesAmount ? 1 : -1;
      }
    });
  }

  filterPurchasesDown() {
    this.searchedUsers.sort((a: User, b: User) => {
      if (a.totalPurchasesAmount && b.totalPurchasesAmount) {
        return b.totalPurchasesAmount - a.totalPurchasesAmount
      } else {
        return a.totalPurchasesAmount ? -1 : 1;
      }
    });
  }

  getUserCoordinates(userAdress: string, userData: User) {
    if (this.geocoder) {
      this.geocoder.geocode({ 'address': userAdress }, (results: any, status) => {
        if (status === 'OK') {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          const newLocation = {
            position: { lat: latitude, lng: longitude },
            title: userData.firstName,
            content: {
                name: userData.firstName + " " + userData.lastName,
                street: userData.street,
                adress: userData.zipCode + " " + userData.city,
                customUserId: userData.customUserId
            }
          }

          this.locations.push(newLocation);
        }
        else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }


  getSingleUserCoordinates(currentUser: User) {
    if (this.geocoder) {
      this.geocoder.geocode({ 'address': currentUser.zipCode + currentUser.city + currentUser.street }, (results: any, status) => {
        if (status === 'OK') {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          this.position = { lat: latitude, lng: longitude }
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getProductRef() {
    return collection(this.firestore, 'products');
  }

  ngonDestroy() {
    // this.unsubUser();
  }
}

