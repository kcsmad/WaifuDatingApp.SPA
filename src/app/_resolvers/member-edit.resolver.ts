import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/of';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(private service: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    return this.service.getUser(this.authService.decodedToken.nameid)
      .catch(error => {
        this.alertify.error('Problem resolving data');
        this.router.navigate(['/members']);
        return Observable.of(null);
      });
  }
}
