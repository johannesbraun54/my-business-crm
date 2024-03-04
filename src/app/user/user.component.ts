import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { userService } from '../service/userService.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule,
            MatDialogModule,
            MatCardModule,
            RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  contentloaded = false;


  constructor(public dialog: MatDialog,  public userService : userService){}
  ngOnInit(): void {
    this.userService.userListSnap();
  }





  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

}
