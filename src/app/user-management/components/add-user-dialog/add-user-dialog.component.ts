import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../../services/user-management.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private  dialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      admin: [false, Validators.required],
    });
  }

  async onSubnit(values): Promise<void> {
    if (this.userForm.invalid) {
      return;
    }

    if (await this.userManagementService.Register(
      values.name,
      values.email,
      values.pass,
      values.admin
    )) {
      this.dialogRef.close(true);
    }

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
