import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:56365/api/auth';
  userToken: any;


  constructor(private http: HttpClient) { }

  login(model: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http.post(this.baseUrl + 'login', model, headers)
      .map((response: Response) => {
        const user = response.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.userToken = user.tokenString;
        }
      });
  }
}
