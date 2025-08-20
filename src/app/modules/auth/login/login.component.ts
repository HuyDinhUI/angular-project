import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    username: '',
    password: '',
  };
  loginForm!: FormGroup;
  hasError: boolean = false;
  returnUrl!: string;
  isLoading$!: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder, public authService: AuthService, private route: ActivatedRoute, private router: Router) {
    // this.isLoading$ = this.authService.isLoading$;
    // // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [this.defaultAuth.username, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      password: [this.defaultAuth.password, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  submit() {
    this.hasError = false;

    if(this.loginForm.valid){
       const loginSubscr = this.authService
      .login(this.f["username"].value, this.f["password"].value)
      .pipe(first())
      .subscribe((user) => {
        if (user) {
          console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
      this.unsubscribe.push(loginSubscr);
    }
   
    
    this.validateAllFormFields(this.loginForm)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
