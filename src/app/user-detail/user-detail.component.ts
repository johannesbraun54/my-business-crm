import { Component } from '@angular/core';
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
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule,
            MatIcon,
            MatButtonModule,
            MatMenuModule,
            DialogAddUserComponent,
            DialogEditAddressComponent,
            DialogEditUserComponent,
            GoogleMapsModule,
            MatExpansionModule],
  templateUrl:'./user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  paramId: any; 
  singleUser: any;
  user: User = new User();
  zoom = 7;
  center!:any; 
  geocoder = new google.maps.Geocoder(); 
  location = 
    { position: { lat: 53.131923, lng: 8.730445 }, title: 'Peter Altmaier', content: {}};
  panelOpenState = false;

  constructor(public route: ActivatedRoute, public firestore: Firestore, public dialog: MatDialog, public userService: userService ){
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.getUser(this.paramId);
  }

  getUser(docId: string){
      this.singleUser = onSnapshot(this.getSingleDocRef(docId), (user) => {
      this.user = new User(user.data());
      this.userService.getSingleUserCoordinates(this.user);
      console.log(this.user);
    });
  }


  editAddress(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.paramId;
  }

  editUser(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.paramId;
  }

  getSingleDocRef(docId:any){
    return doc(collection(this.firestore, 'users'), docId);
  }
}

