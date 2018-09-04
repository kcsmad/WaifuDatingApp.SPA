import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models/User';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../_services/alertify.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;

  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private service: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.service.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alertify.success('Profile updated sucessfully!');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
    this.alertify.success('Profile updated sucessfully!');
    this.editForm.reset(this.user);
  }

}
