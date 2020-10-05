import {EventEmitter, Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth = new EventEmitter<boolean>();

  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserName(): any {
    return localStorage.getItem('name');
  }

  public async Login( email, pass ): Promise<void> {

    const headers = {};
    const body = {email, pass};
    await this.http.post<any>(environment.backendEndpoint + 'auth/login', body, {headers}).toPromise()
      .then(
        res => { // Success
          console.log(res);
          if (res.token) {
            this.snackBar.open('Uspesno Logovanje', 'U Redu', {
              duration: 3000,
            });
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.user.name);
            this.router.navigate(['/machines/list']);
          } else {
            this.snackBar.open(res.message, 'U Redu', {
              duration: 8000,
            });
          }
        },
        msg => { // Error
          console.log(msg);
          this.snackBar.open('Doslo je do greske u komunikaciji sa serverom.', 'U Redu', {
            duration: 5000,
          });
        });
  }

  public Logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/auth']);
  }
}
