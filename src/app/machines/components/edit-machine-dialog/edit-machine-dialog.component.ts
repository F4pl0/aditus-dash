import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MachineService} from '../../services/machine.service';

@Component({
  selector: 'app-edit-machine-dialog',
  templateUrl: './edit-machine-dialog.component.html',
  styleUrls: ['./edit-machine-dialog.component.scss']
})
export class EditMachineDialogComponent implements OnInit {

  machineForm: FormGroup;
  imgStr: string | ArrayBuffer = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private  dialogRef: MatDialogRef<EditMachineDialogComponent>,
    private fb: FormBuilder,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.machineForm = this.fb.group({
      location: [this.data.machine.location, Validators.required],
      image: [''],
      item: [this.data.machine.item, Validators.required],
      price: [this.data.machine.price, Validators.required],
      stock: [this.data.machine.stock],
      maxStock: [this.data.machine.maxStock, Validators.required],
      locationPrice: [this.data.machine.locationPrice, Validators.required]
    });

    this.imgStr = this.data.machine.image;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubnit(values): Promise<void> {
    if (this.machineForm.invalid || this.imgStr === '') {
      return;
    }

    if (await this.machineService.Update(
      this.data.machine._id,
      values.location,
      this.imgStr,
      values.item,
      values.price,
      values.stock,
      values.maxStock,
      values.locationPrice
    )){
      this.dialogRef.close(true);
    }

  }

  onFileChanged($event: Event): void {
    this.getBase64($event);
  }

  getBase64(event): void {
    const me = this;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // me.modelvalue = reader.result;
      this.imgStr = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }


}
