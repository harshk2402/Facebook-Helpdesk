import { Injectable } from "@angular/core";
import { FacebookService, LoginResponse } from "ngx-facebook";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

export class FBUser {
  constructor(
    public name: string,
    public uid: string
  ){}

}

@Injectable({providedIn: "root"})
export class FacebookAuthService {
  private fbUser: FBUser | undefined;
  userSub = new Subject<FBUser>()
  messageSub = new Subject<boolean>();

  constructor(private fb: FacebookService){ }

  login() {
    this.fb.init(environment.fbParams)
    .then(() => {
      this.fb.login()
      .then((res: LoginResponse) => {
        this.getDetails();
      })
      .catch(err => {
        console.error(err);
      })
    })

  }

  logout() {
    this.fb.logout()
    .then(() => {
      this.setFBUser(undefined);
    })
  }

  setFBUser(user: FBUser|undefined){
    this.fbUser = user;
    this.userSub.next(this.fbUser);
  }

  getFBUser(){
    return this.fbUser;
  }

  getDetails(){
    this.fb.api('/me')
    .then(res => {
      const user = new FBUser(res.name, res.id);
      this.setFBUser(user);
     })
  }

  reply(){
  this.messageSub.next(true);
  }
}
