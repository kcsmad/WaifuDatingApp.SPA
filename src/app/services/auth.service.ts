import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUser } from '../_models/auth-user';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:56365/api/auth';
  userToken: any;
  decodedToken: any;
  currentUser: any;


  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) { }

  login(model: any) {
    return this.http.post<AuthUser>(this.baseUrl + 'login', model,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.currentUser = user.user;
          this.userToken = user.tokenString;
        }
      }).catch(this.handleError);
  }

  loggedIn() {
    const token = this.jwtHelper.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

}
