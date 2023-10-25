import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../auth/user.model';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationtimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDr1lcSByxJhnG3MOEQFtx4FrgJbeo1kpM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((responseData) => {
          const expirationData = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );
          const user = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            expirationData
          );
          this.user.next(user);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDr1lcSByxJhnG3MOEQFtx4FrgJbeo1kpM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((reponseData) => {
          const expirationData = new Date(
            new Date().getTime() + +reponseData.expiresIn * 1000
          );
          const user = new User(
            reponseData.email,
            reponseData.localId,
            reponseData.idToken,
            expirationData
          );
          this.user.next(user);
          this.autoLogout(+reponseData.expiresIn * 1000)
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationtimer) {
      clearTimeout(this.tokenExpirationtimer);
    }
    this.tokenExpirationtimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationtimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!user) {
      return;
    }

    const loadedUSer = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUSer.token) {
      this.user.next(loadedUSer);
      const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);

    } else {
      this.user.next(null);
    }
  }
}
