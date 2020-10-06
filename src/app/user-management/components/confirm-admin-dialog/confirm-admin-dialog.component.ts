import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserManagementService} from '../../services/user-management.service';

@Component({
  selector: 'app-confirm-admin-dialog',
  templateUrl: './confirm-admin-dialog.component.html',
  styleUrls: ['./confirm-admin-dialog.component.scss']
})
export class ConfirmAdminDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private  dialogRef: MatDialogRef<ConfirmAdminDialogComponent>,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async confirm(): Promise<void> {
    if (await this.userManagementService.MakeAdmin(this.data._id)) {
      this.dialogRef.close(true);
    }
  }
}
