import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';
import {LoaderService} from '../../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { }

  public async GetAll(): Promise<{ users: any[]} > {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};

    try {
      const res = await this.http.get<any>(environment.backendEndpoint + 'auth/getAll', {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.users) {
        return {users: res.users};
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return {users: []};
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return {users: []};
    }
  }

  public async Register(
    name,
    email,
    pass,
    admin
  ): Promise<{ success: boolean } > {
    this.loaderService.setLoading(true);

    const headers = { Authorization : this.authService.getToken()};

    const options = {
      name,
      email,
      pass,
      admin
    };

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'auth/register', options, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.user) {
        this.snackBar.open('Uspesno ste dodali korisnika.', 'U Redu', {
          duration: 3000,
        });
        return { success: true };
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return { success: false };
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return { success: false };
    }
  }

  public async MakeAdmin(
    // tslint:disable-next-line:variable-name
    _id
  ): Promise<{ success: boolean } > {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};

    const options = {
      _id
    };

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'auth/makeAdmin', options, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.success) {
        this.snackBar.open('Uspesno ste unapredili korisnika.', 'U Redu', {
          duration: 3000,
        });
        return { success: true };
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return { success: false };
      }
    } catch (e) {
      this.loaderService.setLoading(false);
      console.log(e);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return { success: false };
    }
  }

  public async DeleteUser(
    // tslint:disable-next-line:variable-name
    _id
  ): Promise<{ success: boolean } > {

    this.loaderService.setLoading(true);
    const headers = { Authorization : this.authService.getToken()};

    const options = {
      _id
    };

    try {
      const res = await this.http.post<any>(environment.backendEndpoint + 'auth/deleteUser', options, {headers}).toPromise();
      console.log(res);
      this.loaderService.setLoading(false);
      if (res.success) {
        this.snackBar.open('Uspesno ste obrisali korisnika.', 'U Redu', {
          duration: 3000,
        });
        return { success: true };
      } else {
        this.snackBar.open(res.message, 'U Redu', {
          duration: 8000,
        });
        return { success: false };
      }
    } catch (e) {
      console.log(e);
      this.loaderService.setLoading(false);
      this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
        duration: 5000,
      });
      return { success: false };
    }
  }
}
