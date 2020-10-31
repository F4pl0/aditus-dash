import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewMachineDialogComponent} from '../new-machine-dialog/new-machine-dialog.component';
import {MachineService} from '../../services/machine.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  machines = [  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public dialog: MatDialog,
    private machineService: MachineService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.machineService.GetAll().then( res => {
      this.machines = res.machines;
    });
  }

  openNewMachineDialog(): void {
    const dialog = this.dialog.open(NewMachineDialogComponent);
    dialog.afterClosed().subscribe( res => {
      if (res) {
        this.machineService.GetAll().then( resa => {
          this.machines = resa.machines;
        });
      }
    });
  }

}
