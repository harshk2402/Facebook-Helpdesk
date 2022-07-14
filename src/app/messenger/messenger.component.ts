import { Component, OnInit } from '@angular/core';
import { FacebookAuthService, FBUser } from '../facebook-conn/facebook-auth.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  fbUser: FBUser | undefined;
  constructor(private fbAuth: FacebookAuthService) { }

  ngOnInit(): void {
    this.fbUser = this.fbAuth.getFBUser();
  }

}
