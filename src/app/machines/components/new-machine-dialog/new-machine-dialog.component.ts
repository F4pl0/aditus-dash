import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MachineService} from '../../services/machine.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-new-machine-dialog',
  templateUrl: './new-machine-dialog.component.html',
  styleUrls: ['./new-machine-dialog.component.scss']
})
export class NewMachineDialogComponent implements OnInit {

  machineForm: FormGroup;
  imgStr: string | ArrayBuffer = '';
  currency = environment.currency;

  constructor(
    private  dialogRef: MatDialogRef<NewMachineDialogComponent>,
    private fb: FormBuilder,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.machineForm = this.fb.group({
      location: ['', Validators.required],
      image: ['', Validators.required],
      item: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0],
      maxStock: [0, Validators.required],
      locationPrice: [0, Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubnit(values): Promise<void> {
    if (this.machineForm.invalid || this.imgStr === '') {
      return;
    }

    if (await this.machineService.New(
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
