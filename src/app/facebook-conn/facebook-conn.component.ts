import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FacebookAuthService, FBUser } from './facebook-auth.service';

@Component({
  selector: 'app-facebook-conn',
  templateUrl: './facebook-conn.component.html',
  styleUrls: ['./facebook-conn.component.css']
})
export class FacebookConnComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  fbUser: FBUser|undefined = undefined;

  constructor(private fbAuth: FacebookAuthService) {  }

  ngOnInit(): void {
    this.fbAuth.userSub.subscribe((user: FBUser) => {
      this.fbUser = user;
      if(user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
  }

  login() {
    this.fbAuth.login();
  }

  logout(){
    this.fbAuth.logout();
  }

  reply() {
    this.fbAuth.reply();
  }

  ngOnDestroy(): void {
      this.fbAuth.userSub.unsubscribe();
  }

}
