import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../../services/user-management.service';
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import {ConfirmAdminDialogComponent} from '../confirm-admin-dialog/confirm-admin-dialog.component';
import {ConfirmDeleteUserDialogComponent} from '../confirm-delete-user-dialog/confirm-delete-user-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'actions'];
  users = [];

  constructor(
    private userManagementService: UserManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userManagementService.GetAll().then( res => {
      this.users = res.users;
    });
  }

  openRegisterDialog(): void {
    this.dialog.open(AddUserDialogComponent).afterClosed().subscribe(r => {
      if (r) {
        this.userManagementService.GetAll().then( res => {
          this.users = res.users;
        });
      }
    });
  }

  // tslint:disable-next-line:variable-name
  openConfirmAdminDialog( _id: string ): void {
    this.dialog.open(ConfirmAdminDialogComponent, {
      data: {
        _id
      }
    }).afterClosed().subscribe(r => {
      if (r) {
        this.userManagementService.GetAll().then( res => {
          this.users = res.users;
        });
      }
    });
  }

  // tslint:disable-next-line:variable-name
  openConfirmDeleteDialog( _id: string ): void {
    this.dialog.open(ConfirmDeleteUserDialogComponent, {
      data: {
        _id
      }
    }).afterClosed().subscribe(r => {
      if (r ) {
        this.userManagementService.GetAll().then( res => {
          this.users = res.users;
        });
      }
    });
  }

}
