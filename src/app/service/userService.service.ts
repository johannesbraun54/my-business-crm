import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.class";
import { Firestore, collection, onSnapshot, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class userService {
  user = new User();
  allUsers: any = []
  searchedUsers: any = [];
  userPurchases: any = [];
  totalAmountsFromUser: number[] = [];
  totalRevenue: number[] = [];
  searchTerm!: string;
  geocoder = new google.maps.Geocoder();
  position = { lat: 0.0, lng: 0.0 };
  unsubUser;
  contentloaded = false;
  originalArray = [];
  locations = [
    {
      position: { lat: 53.131923, lng: 8.730445 }, title: 'Peter Altmaier',
      content: {
        name: 'Peter Altmaier',
        adress: " 30159 Hannover",
        street: "Herschelstraße 5",
        customUserId: "1EHnz9s0cNfy2rWbCvtG"
      }
    },
  ];

  location = [{
    position: { lat: 0.0, lng: 0.0 }, title: 'Peter Altmaier'
  }]


  constructor(public firestore: Firestore) {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      this.geocoder = new google.maps.Geocoder();
    } else {
      console.error('Google Maps API is not available.');
    }
    this.unsubUser = this.userListSnap();
  }

  searchItem() {
      this.searchedUsers = this.allUsers.filter((user: User) => {
        return (
          user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.city.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
  }

  async userListSnap() {
    return onSnapshot(this.getUserRef(), (userList) => {
      this.allUsers = [];
      userList.forEach(userSnap => {
        let customUserId = userSnap.get('customUserId');
        customUserId = userSnap.id;
        const userData = userSnap.data()
        userData['customUserId'] = customUserId;
        const userAdress = userData['zipCode'] + userData['city'] + userData['street'];
        const userName = userData['firstName'] + " " + userData['lastName'];
        this.allUsers.push(userData);
        this.getUserCoordinates(userAdress, userData);
        if (this.searchTerm == undefined) {
          this.searchedUsers = this.allUsers;
        }
      })
      this.contentloaded = true
    })
  }


  structurateUserData(myFilter: string) {
    for (let i = 0; i < this.allUsers.length; i++) {
      let sum = 0;
      const user = this.allUsers[i];
      this.getTotalRevenue(user ,sum);
      this.getTotalPurchaseFromUser(user)
    }
    this.filterUser(myFilter)
  }

  getTotalRevenue(user:User ,sum:number){
    for (let j = 0; j < user.purchases.length; j++) {
      const purchase = user.purchases[j];
      sum += purchase.totalAmount
      user.totalRevenue = sum
    }
  }

  getTotalPurchaseFromUser(user:User){
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
        this.searchedUsers.sort((a: any, b: any) => {
          if (a.totalRevenue && b.totalRevenue) {
            return a.totalRevenue - b.totalRevenue;
          } else {
            return a.totalRevenue ? 1 : -1;
          }
        });
        break;
      case 'salesDown-2':
        this.searchedUsers.sort((a: any, b: any) => {
          if (a.totalRevenue && b.totalRevenue) {
            return b.totalRevenue - a.totalRevenue
          } else {
            return a.totalRevenue ? -1 : 1;
          }
        });
        break;
        case 'purchasesUp-3':
        this.searchedUsers.sort((a: any, b: any) => {
          if (a.totalPurchasesAmount && b.totalPurchasesAmount) {
            return a.totalPurchasesAmount - b.totalPurchasesAmount
          } else {
            return a.totalPurchasesAmount ? 1 : -1;
          }
        });
          break;
        case 'purchasesDown-4': 
        this.searchedUsers.sort((a: any, b: any) => {
          if (a.totalPurchasesAmount && b.totalPurchasesAmount) {
            return b.totalPurchasesAmount - a.totalPurchasesAmount
          } else {
            return a.totalPurchasesAmount ? -1 : 1;
          }
        });
        break;

    }
  }

  getUserCoordinates(userAdress: string, userData: any) {
    this.geocoder.geocode({ 'address': userAdress }, (results: any, status) => {
      if (status === 'OK') {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();

        this.locations
          .push({
            position: { lat: latitude, lng: longitude },
            title: userData.firstName,
            content: {
              name: userData.firstName + " " + userData.lastName,
              adress: userData.zipCode + " " + userData.city,
              street: userData.street,
              customUserId: userData.customUserId
            }
          });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


  getSingleUserCoordinates(currentUser: any) {
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

  getUserRef() {
    return collection(this.firestore, "users");
  }

  ngonDestroy() {
    // this.unsubUser();
  }
}

