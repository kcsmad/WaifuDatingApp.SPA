import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertifyService} from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Logged in successfully!');
    }, error => {
      this.alertify.error(error);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('Logged out!')
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
