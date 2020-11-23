import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LoaderService} from '../../../services/loader.service';
import {log} from 'util';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-view-csv-dialog',
  templateUrl: './view-csv-dialog.component.html',
  styleUrls: ['./view-csv-dialog.component.scss']
})
export class ViewCsvDialogComponent implements OnInit {

  displayedColumns: string[] = ['date', 'price', 'quantity'];
  sales = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  viewTable = false;
  currency = environment.currency;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private  dialogRef: MatDialogRef<ViewCsvDialogComponent>,
    private loaderService: LoaderService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loaderService.setLoading(true);
    try {
      fetch(this.data.csv).then( r => {return r.text(); } ).then((t: any) => {
        console.log(t);
        this.loaderService.setLoading(false);
        // tslint:disable-next-line:one-variable-per-declaration
        const lines: string[] = t.split('\n');
        lines.forEach(line => {
          const lineData = line.split(',');
          this.sales.push({
            date: new Date(lineData[0]),
            price: lineData[1],
            quantity: lineData[2]
          });
        });
        this.dataSource = new MatTableDataSource<any>(this.sales);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.viewTable = true;
      });
    } catch (e) {
      this.loaderService.setLoading(false);
    }
  }

}
