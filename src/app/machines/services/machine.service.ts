import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';
import {LoaderService} from '../../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { }

  public async New( location, image, item, price, stock, maxStock, locationPrice ): Promise<boolean> {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};
    const body = {location, image, item, price, stock, maxStock, locationPrice};

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'machine/new', body, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.machine) {
        this.snackBar.open('Uspesno ste dodali Masinu', 'U Redu', {
          duration: 3000,
        });
        return true;
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return false;
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return false;
    }
  }

  // tslint:disable-next-line:variable-name
  public async Update( _id, location, image, item, price, stock, maxStock, locationPrice ): Promise<boolean> {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};
    const body = {_id, location, image, item, price, stock, maxStock, locationPrice};

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'machine/update', body, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.success) {
        this.snackBar.open('Uspesno ste izmenili Masinu', 'U Redu', {
          duration: 3000,
        });
        return true;
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return false;
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return false;
    }
  }

  // tslint:disable-next-line:variable-name
  public async Delete( _id ): Promise<boolean> {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};
    const body = {_id};

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'machine/delete', body, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.success) {
        this.snackBar.open('Uspesno ste obrisali Masinu', 'U Redu', {
          duration: 3000,
        });
        return true;
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return false;
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return false;
    }
  }

  public async GetAll(): Promise<{ machines: any[]} > {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};

    try {
      const res = await this.http.get<any>(environment.backendEndpoint + 'machine/getAll', {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.machines) {
        return {machines: res.machines};
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return {machines: []};
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return {machines: []};
    }
  }

  // tslint:disable-next-line:variable-name
  public async Get( _id ): Promise< { machine: any } > {

    this.loaderService.setLoading(true);
    const headers = {Authorization: this.authService.getToken()};
    const body = {_id};

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'machine/get', body, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.machine) {
        return {machine: res.machine};
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return {machine: false};
      }
    } catch (e) {
      console.log(e);
      this.loaderService.setLoading(false);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return {machine: false};
    }
  }

  // tslint:disable-next-line:variable-name
  public async Restock( _id, stock ): Promise< boolean > {

    this.loaderService.setLoading(true);
    const headers = {Authorization: this.authService.getToken()};
    const body = {_id, stock};

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'machine/restock', body, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.success) {
        return true;
      }
       else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return false;
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return false;
    }
  }
}
