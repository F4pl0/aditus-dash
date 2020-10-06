import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserManagementService} from '../../services/user-management.service';

@Component({
  selector: 'app-confirm-delete-user-dialog',
  templateUrl: './confirm-delete-user-dialog.component.html',
  styleUrls: ['./confirm-delete-user-dialog.component.scss']
})
export class ConfirmDeleteUserDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private  dialogRef: MatDialogRef<ConfirmDeleteUserDialogComponent>,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async confirm(): Promise<void> {
    if (await this.userManagementService.DeleteUser(this.data._id)) {
      this.dialogRef.close(true);
    }
  }

}
