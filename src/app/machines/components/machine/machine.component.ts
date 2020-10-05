import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MachineService} from '../../services/machine.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteMachineDialogComponent} from '../confirm-delete-machine-dialog/confirm-delete-machine-dialog.component';
import {EditMachineDialogComponent} from '../edit-machine-dialog/edit-machine-dialog.component';
import {RestockDialogComponent} from '../restock-dialog/restock-dialog.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  machine: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private machineService: MachineService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.machineService.Get(params.id).then( res => {
        if (res.machine){
          this.machine = res.machine;
          console.log(this.machine);
        } else {
          this.router.navigate(['/machines/list']);
        }
      });
    });
  }

  openConfirmDeleteDialog(): void {
    this.dialog.open(ConfirmDeleteMachineDialogComponent, {
      data: {
        _id: this.machine._id
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['/machines/list']);
      }
    });
  }

  openRestockDialog(): void {
    this.dialog.open(RestockDialogComponent, {
      data: {
        machine: this.machine
      }
    }).afterClosed().subscribe( res => {
      if (res) {
        this.machineService.Get(this.machine._id).then( resa => {
          if (resa.machine){
            this.machine = resa.machine;
            console.log(this.machine);
          } else {
            this.router.navigate(['/machines/list']);
          }
        });
      }
    });
  }

  openEditMachineDialog(): void {
    this.dialog.open(EditMachineDialogComponent, {
      data: {
        machine: this.machine
      }
    }).afterClosed().subscribe( res => {
      if (res) {
        this.machineService.Get(this.machine._id).then( resa => {
          if (resa.machine){
            this.machine = resa.machine;
            console.log(this.machine);
          } else {
            this.router.navigate(['/machines/list']);
          }
        });
      }
    });
  }

}
