import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUser } from '../_models/auth-user';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:56367/api/auth/';
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

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}).catch(this.handleError);
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.json();

    let modelStateErrors = '';

    if (serverError) {
      for(const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }

        return Observable.throw(modelStateErrors || 'Server error');
      }
    }
  }

}
