import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models/User';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../_services/alertify.service';
import {NgForm} from '@angular/forms';

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
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated sucessfully!');
    this.editForm.reset(this.user);
  }

}
