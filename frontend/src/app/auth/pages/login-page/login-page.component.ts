import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {


  public loginForm = new FormGroup({
    login: new FormControl<String>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl<String>('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  get currentLogin(): Login {
    const login = this.loginForm.value as Login;
    return login;
  }

  onLogin() {
    this.authService.request(
      "POST",
      "/login",
      {
        login: this.currentLogin.login,
        password: this.currentLogin.password
      }).then(
        response => {
          this.authService.setAuthToken(response.data.token);
          this.router.navigateByUrl('/collection');
        }).catch(
          error => {
            this.authService.setAuthToken(null);
            this.router.navigateByUrl('/auth/register');
          }
        );
  }
  
  isValidFiled(field: string): boolean | null {
    const control = this.loginForm.get(field);
    if (!control) {
      console.error(`Control ${field} not found`);
      return null;
    }
    return control.errors && control.touched;
  }

  
  getFieldError(field: string): string | null {
    const control = this.loginForm.get(field);

    if (!control) return null;
    const errors = control.errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This filed is required';
        case 'minlength':
          return `Minim ${errors['minlength'].requiredLength} characters`;
      }
    }
    return null;
  }
}
