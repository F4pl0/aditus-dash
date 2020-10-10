import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MachineService} from '../../services/machine.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteMachineDialogComponent} from '../confirm-delete-machine-dialog/confirm-delete-machine-dialog.component';
import {EditMachineDialogComponent} from '../edit-machine-dialog/edit-machine-dialog.component';
import {RestockDialogComponent} from '../restock-dialog/restock-dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ViewCsvDialogComponent} from '../view-csv-dialog/view-csv-dialog.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'sales', 'price', 'actions'];
  dataSource: MatTableDataSource<any>;
  machine: any = {
    days: [
      {date: new Date(),
      csvUrl: ''}
    ]
  };

  showTable = false;

  chartData = [{
    name: 'Prodaje',
    series: [
    ]
  }];

  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dan';
  yAxisLabel = 'Prodaje';
  timeline = true;
  viewChart = false;
  view: any[] = [0, 500];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
          res.machine.days.forEach( day => {
            day.date = new Date(day.date);
            this.chartData[0].series.push(
              {
                name: '' + day.date.getDate() + '/' + (day.date.getMonth() + 1) + '/' + day.date.getFullYear(),
                value: day.sales
              }
            );
          });
          this.machine = res.machine;
          this.dataSource = new MatTableDataSource<any>(this.machine.days);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.viewChart = true;
          this.showTable = true;
          console.log(this.machine);
          console.log(this.chartData);
        } else {
          this.router.navigate(['/machines/list']);
        }
      });
    });
  }

  ngAfterViewInit(): void {

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

  downloadCSV(csv): void {
    window.open(csv, '_blank');
  }

  openCSV(csv): void {
    this.dialog.open(ViewCsvDialogComponent, {
      data: {
        csv
      }
    });
  }

}
