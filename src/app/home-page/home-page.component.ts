import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userObs.subscribe((user: User) => {
        if(user != undefined) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
    })
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
    this.authService.login(email, password);
    this.emailLogin.nativeElement.value = "";
    this.passLogin.nativeElement.value = "";
  }

  ngOnDestroy(): void {
      this.authService.userObs.unsubscribe();
  }

}
