import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { AuthService } from '../services/auth.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authentication: NgForm;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  public isLogin: boolean = true;
  public isLoader: boolean = false;
  public isError: string = null;
  private CloseSubs: Subscription;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private ComponentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(authform: NgForm) {
    if (!authform.valid) {
      return;
    }

    if (this.isLogin) {
      const email = authform.value.email;
      const password = authform.value.password;

      this.isLoader = true;

      this.AuthService.login(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoader = false;
          this.router.navigate(['/recipe']);
        },
        (error) => {
          console.log(error);
          if (error.error.error.message) {
            let errorMessage = error.error.error.message;
            this.isLoader = false;
            this.isError = 'An Error Occured - ' + errorMessage;
            this.ShowErrorAlert(this.isError);
          } else {
            this.isLoader = false;
            this.isError = 'An Error Occured';
            this.ShowErrorAlert(this.isError);
          }
        }
      );
    } else {
      const email = authform.value.email;
      const password = authform.value.password;

      this.isLoader = true;

      this.AuthService.signup(email, password).subscribe(
        (responseData) => {
          // console.log(responseData);
          this.isLoader = false;
          alert('User Added Sucessfully');
          this.router.navigate(['/recipe']);
        },
        (error) => {
          // console.log(error);
          if (error.error.error.message) {
            let errorMessage = error.error.error.message;
            this.isLoader = false;
            this.isError = 'An Error Occured - ' + errorMessage;
            this.ShowErrorAlert(this.isError);
          } else {
            this.isLoader = false;
            this.isError = 'An Error Occured';
            this.ShowErrorAlert(this.isError);
          }
        }
      );
    }

    console.log(authform.value);
    this.authentication.reset();
  }

  onHandleError() {
    this.isError = null;
  }

  private ShowErrorAlert(message: string) {
    const AlertComp =
      this.ComponentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const ComponentRef = hostViewContainerRef.createComponent(AlertComp);
    ComponentRef.instance.message = message;

   this.CloseSubs = ComponentRef.instance.close.subscribe(() => {
      this.CloseSubs.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
      if (this.CloseSubs) {
        this.CloseSubs.unsubscribe();
      }
      else{
        return 
      }
  }
}
