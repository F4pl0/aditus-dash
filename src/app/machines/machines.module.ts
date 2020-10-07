import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesRoutingModule } from './machines-routing.module';
import { RootComponent } from './components/root/root.component';
import {AppModule} from '../app.module';
import { ListComponent } from './components/list/list.component';
import { MachineComponent } from './components/machine/machine.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgCircleProgressModule} from 'ng-circle-progress';
import { NewMachineDialogComponent } from './components/new-machine-dialog/new-machine-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EditMachineDialogComponent } from './components/edit-machine-dialog/edit-machine-dialog.component';
import { ConfirmDeleteMachineDialogComponent } from './components/confirm-delete-machine-dialog/confirm-delete-machine-dialog.component';
import { RestockDialogComponent } from './components/restock-dialog/restock-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
    declarations: [
      RootComponent,
      ListComponent,
      MachineComponent,
      NavBarComponent, NewMachineDialogComponent, EditMachineDialogComponent, ConfirmDeleteMachineDialogComponent, RestockDialogComponent],
  imports: [
    CommonModule,
    MachinesRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class MachinesModule { }
