import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs/operators';
import { AlertService } from '../../dialogs/alert/alert.service';
const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url = environment.url + '/noauth/admin/adminlogin';
  public authenticationState: boolean = false;
  private partnerId;
  private _token;

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    public alertService: AlertService
  ) {}

  getJwtToken(): any {
    if (this._token == undefined || this._token == '') {
      this._token = localStorage.getItem(TOKEN_KEY);
    }
    return this._token;
  }

  checkToken(): Promise<boolean> {
    return new Promise((resolve) => {
      var token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.authenticationState = true;
          this.partnerId = decoded;
          resolve(this.authenticationState);
        } else {
          this.authenticationState = false;
          localStorage.removeItem(TOKEN_KEY);
          resolve(this.authenticationState);
        }
      } else {
        this.authenticationState = false;
        resolve(this.authenticationState);
      }
    });
  }

  login(credentials) {
    return this.http.post(this.url, credentials).pipe(
      tap((res: any) => {
        if (res.success) {
          this._token = res['access_token'];
          localStorage.setItem(TOKEN_KEY, res['access_token']);
          this.partnerId = this.helper.decodeToken(res['access_token']);
          this.authenticationState = true;
        } else {
          console.log(res);
          this.alertService.showAlert('Erro', res.message);
        }
      }),
      catchError((err) => {
        throw new Error();
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState = false;
  }

  isAuthenticated(): Promise<boolean> {
    return this.checkToken();
  }
}
