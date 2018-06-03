import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig, AuthHttp} from 'angular2-jwt';

export function authHttpServiceFacotry(http: HttpClient) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}]
  }), http);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [HttpClient, HttpHeaders],
    }
  ]
})
export class AuthModule { }
