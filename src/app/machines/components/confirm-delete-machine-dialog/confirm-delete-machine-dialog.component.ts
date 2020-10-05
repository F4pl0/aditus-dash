import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MachineService} from '../../services/machine.service';

@Component({
  selector: 'app-confirm-delete-machine-dialog',
  templateUrl: './confirm-delete-machine-dialog.component.html',
  styleUrls: ['./confirm-delete-machine-dialog.component.scss']
})
export class ConfirmDeleteMachineDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private  dialogRef: MatDialogRef<ConfirmDeleteMachineDialogComponent>,
    private fb: FormBuilder,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async delete(): Promise<void> {
    if (await this.machineService.Delete(this.data._id)) {
      this.dialogRef.close(true);
    }
  }

}
