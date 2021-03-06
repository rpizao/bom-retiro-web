import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/_auth/models/user.model';
import { MessageDialogService } from '../../components/message-dialog/confirm-dialog.service';
import { AuthService } from './../../../_auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navToggle: Boolean = false;
  navSelectedPosition: number = 0;
  user: UserModel;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.getUserData();
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  toggleNav() {
    this.navToggle  = !this.navToggle;
  }

  isSelected(position: number): boolean {
    return position == this.navSelectedPosition;
  }

}
