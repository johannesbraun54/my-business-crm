import { Injectable, OnDestroy } from "@angular/core";
import { User } from "../models/user.class";
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Purchase } from "../models/purchase.class";
import { Location } from "../models/locations.class";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class userService implements OnDestroy {
  user = new User();
  allUsers: User[] = []
  searchedUsers: User[] = [];
  userPurchases: Purchase[] = [];
  arrayForPurchasesUpdate: any = [];
  totalAmountsFromUser: number[] = [];
  totalRevenue: number[] = [];

  januaryPurchases: any = [];
  januaryRevenue: number = 0;
  januaryQuantity: number = 0;

  februaryPurchases: any[] = [];
  februaryRevenue: number = 0;
  februaryQuantity: number = 0;

  marchPurchases: any[] = [];
  marchRevenue: number = 0;
  marchQuantity: number = 0;

  aprilPurchases: any[] = [];
  aprilRevenue: number = 0;
  aprilQuantity: number = 0;

  mayPurchases: any[] = [];
  mayRevenue: number = 0;
  mayQuantity: number = 0;

  junePurchases: any[] = [];

  totalQuantity!: number;
  totalSales!: number;
  searchTerm!: string;
  geocoder!: any;
  position = { lat: 0.0, lng: 0.0 };
  unsubUserList!: any;
  subject = new Subject();
  mealDeleted = false;
  userDeleted = false;
  contentloaded = false;
  newlocation = new Location();
  locations: Location[] = [];
  correctCoordinates!: boolean;
  statisticDataLoaded = false;

  allUsersSubject = new Subject<User[]>();

  constructor(public firestore: Firestore) {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.info('Google Maps API is loading.');
    }
  }


  ngOnDestroy(): void {

  }

  async userListSnap() {
    return onSnapshot(this.getUserRef(), (userList) => {
      this.allUsers = [];
      this.locations = [];
      userList.forEach((userSnap: DocumentData) => {
        this.getUserData(userSnap);
        this.filterPurchasesByMonth();
      })
      this.contentloaded = true;
      this.allUsersSubject.next(this.allUsers);
    })
  }

  calculateTotalSums() {
    this.totalQuantity = this.januaryQuantity + this.februaryQuantity + this.marchQuantity
  }

  getUserData(userSnap: DocumentData) {
    let customUserId = userSnap['get']('customUserId');
    customUserId = userSnap['id'];
    const userData: User = userSnap['data']() as User
    userData['customUserId'] = customUserId;
    const userAdress = userData['zipCode'] + userData['city'] + userData['street'];
    this.allUsers.push(userData);
    this.getUserCoordinates(userAdress, userData);
    if (this.searchTerm === undefined || '') {
      this.searchedUsers = this.allUsers;
    }
  }


  searchUserDetail() {
    if (this.searchTerm !== undefined) {
      this.searchedUsers = this.allUsers.filter((user: User) => {
        return (
          user.firstName.toLowerCase().includes(this.searchTerm.trim().toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchTerm.trim().toLowerCase()) ||
          user.city.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        );
      });
    }

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
      this.getTotalRevenue(user);
      this.getTotalPurchaseFromUser(user);
    }
    this.filterUser(myFilter)
  }

  getTotalRevenue(user: User) {
    let sum = 0;
    for (let j = 0; j < user.purchases.length; j++) {
      const purchase = user.purchases[j];
      sum += purchase.totalAmount
    }
    user.totalRevenue = sum
  }

  getTotalPurchaseFromUser(user: User) {
    let sum = 0;
    for (let j = 0; j < user.purchases.length; j++) {
      const purchase = user.purchases[j];
      for (let k = 0; k < purchase.amounts.length; k++) {
        const amount = purchase.amounts[k];
        sum += amount
      }
    }
    user.totalPurchasesAmount = sum
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

  async checkCoordinatesFromNewUser(userAdress: string, user: User) {
    try {
      await this.geocoder.geocode({ 'address': userAdress }, (results: any, status: any) => {
        if (status == "OK") {
          if (results[0]?.address_components.length >= 8) {
            this.correctCoordinates = true
            user.street = results[0].address_components[1].long_name + " " + results[0].address_components[0].long_name;
            user.city = results[0].address_components[2].long_name;
            user.zipCode = results[0].address_components[7].long_name;
          }
        } else {
          this.correctCoordinates = false
        }
      })
    } catch (error) { }

  }

  getUserCoordinates(userAdress: string, userData: User) {
    if (this.geocoder) {
      this.geocoder.geocode({ 'address': userAdress }, (results: any, status: any) => {
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
          console.info('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }


  getSingleUserCoordinates(currentUser: User) {
    if (this.geocoder) {
      this.geocoder.geocode({ 'address': currentUser.zipCode + currentUser.city + currentUser.street }, (results: any, status: any) => {
        if (status === 'OK') {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          this.position = { lat: latitude, lng: longitude }
        } else {
          console.info('Geocode was not successful for single user for the following reason: ' + status);
        }
      });
    }
  }

  filterQuantitybyMonth(array: Purchase[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      const amounts = array[i].amounts;
      for (let j = 0; j < amounts.length; j++) {
        const amount = amounts[j];
        sum += amount
      }
    }
    return sum
  }

  getMonthlyTotalRevenue(monthArray: Purchase[]) {
    let sum = 0;
    for (let i = 0; i < monthArray.length; i++) {
      const purchase = monthArray[i];
      sum += purchase.totalAmount
    }
    return sum
  }

  getMonthlyStats(purchase: Purchase, purchaseTime: string) {
    if (purchaseTime.includes('Januar')) {
      this.januaryPurchases.push(purchase);
      this.januaryRevenue = this.getMonthlyTotalRevenue(this.januaryPurchases);
      this.januaryQuantity = this.filterQuantitybyMonth(this.januaryPurchases);

    } else if (purchaseTime.includes('Februar')) {
      this.februaryPurchases.push(purchase);
      this.februaryRevenue = this.getMonthlyTotalRevenue(this.februaryPurchases);
      this.februaryQuantity = this.filterQuantitybyMonth(this.februaryPurchases);

    } else if (purchaseTime.includes('März')) {
      this.marchPurchases.push(purchase);
      this.marchRevenue = this.getMonthlyTotalRevenue(this.marchPurchases);
      this.marchQuantity = this.filterQuantitybyMonth(this.marchPurchases);

    } else if (purchaseTime.includes('April')) {
      this.aprilPurchases.push(purchase);
      this.aprilRevenue = this.getMonthlyTotalRevenue(this.aprilPurchases);
      this.aprilQuantity = this.filterQuantitybyMonth(this.aprilPurchases);

    } else if (purchaseTime.includes('Mai')) {
      this.mayPurchases.push(purchase);
      this.mayRevenue = this.getMonthlyTotalRevenue(this.mayPurchases);
      this.mayQuantity = this.filterQuantitybyMonth(this.mayPurchases);
    }
    this.totalSales = this.januaryRevenue + this.februaryRevenue + this.marchRevenue + this.aprilRevenue + this.mayRevenue;
    this.totalQuantity = this.januaryQuantity + this.februaryQuantity + this.marchQuantity + this.aprilQuantity + this.mayQuantity;
  }

  filterPurchasesByMonth() {
    this.januaryPurchases = [];
    this.februaryPurchases = [];
    this.marchPurchases = [];
    this.aprilPurchases = [];
    this.mayPurchases = [];
    for (let i = 0; i < this.allUsers.length; i++) {
      const user = this.allUsers[i];
      for (let j = 0; j < user.purchases.length; j++) {
        const purchase = user.purchases[j];
        const purchaseTime = purchase.purchaseTime;
        this.getMonthlyStats(purchase, purchaseTime);
      }
    }
  }

  newPurchaseToJson(obj: Purchase) {
    return {
      amounts: obj.amounts,
      products: obj.products,
      prices: obj.prices,
      purchaseTime: obj.purchaseTime,
      totalAmount: obj.totalAmount,
    }
  }

  getPurchaseToJson(user: User) {
    this.arrayForPurchasesUpdate = [];
    if (user.purchases[0][0]) {
      user.purchases[0][0].forEach((purchase: Purchase) => {
        let purchaseAsJson = this.newPurchaseToJson(purchase)
        this.arrayForPurchasesUpdate.push(purchaseAsJson);
      })
    }
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getProductRef() {
    return collection(this.firestore, 'products');
  }
}

