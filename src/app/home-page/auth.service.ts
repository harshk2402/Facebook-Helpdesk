import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Subject } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService{
  auth: Auth;
  private user: User|undefined;
  userObs = new Subject<User>();

  constructor(private http: HttpClient){
    this.auth = getAuth()
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email:string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
    .then(credentials => {
      console.log(credentials);
      const displayName = credentials.user.displayName ? credentials.user.displayName : "";
      const user = new User(displayName, email, credentials.user.uid);
      this.setUser(user);
    })
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
    this.userObs.next(user);
  }

  updateUserName() {
    updateProfile(this.auth.currentUser!, {displayName: this.user?.name})
    .then(() => {})
  }
}
