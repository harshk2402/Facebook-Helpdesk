import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FacebookAuthService } from '../facebook-conn/facebook-auth.service';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  isOnRegister: boolean = true;
  @ViewChild('nameInp') nameInp !: ElementRef<HTMLInputElement>;
  @ViewChild('emailInp') emailInp !: ElementRef<HTMLInputElement>;
  @ViewChild('passInp') passInp !: ElementRef<HTMLInputElement>;
  @ViewChild('emailLogin') emailLogin !: ElementRef<HTMLInputElement>;
  @ViewChild('passLogin') passLogin !: ElementRef<HTMLInputElement>;
  isLoggedIn = false;
  isAtMessages = false;

  constructor(private authService: AuthService, private fbAuth: FacebookAuthService) { }

  ngOnInit(): void {
    this.authService.userObs.subscribe((user: User) => {
        if(user != undefined) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
    });

    this.fbAuth.messageSub.subscribe((isAtMessages: boolean) => {
      this.isAtMessages = isAtMessages;
    });
  }

  signup(name: string, email: string, password: string) {
    this.authService.signup(email, password).then(credentials => {
      this.nameInp.nativeElement.value = "";
      this.emailInp.nativeElement.value = "";
      this.passInp.nativeElement.value = "";
      const user = new User(name, email, credentials.user.uid);
      this.authService.setUser(user);
      this.authService.updateUserName();
    });
  }

  login(email: string, password: string) {
    this.emailLogin.nativeElement.value = "";
    this.passLogin.nativeElement.value = "";
    this.authService.login(email, password);
  }

  ngOnDestroy(): void {
      this.authService.userObs.unsubscribe();
  }

}
