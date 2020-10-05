import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MachineService} from '../../services/machine.service';

@Component({
  selector: 'app-restock-dialog',
  templateUrl: './restock-dialog.component.html',
  styleUrls: ['./restock-dialog.component.scss']
})
export class RestockDialogComponent implements OnInit {

  restockForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private  dialogRef: MatDialogRef<RestockDialogComponent>,
    private fb: FormBuilder,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.restockForm = this.fb.group({
      stock: [this.data.machine.stock]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubnit(values): Promise<void> {
    if (this.restockForm.invalid) {
      return;
    }

    if (await this.machineService.Restock(
      this.data.machine._id,
      values.stock,
    )){
      this.dialogRef.close(true);
    }

  }
}
