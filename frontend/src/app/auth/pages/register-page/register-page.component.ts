import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/Register';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  public registerForm = new FormGroup({
    firstName: new FormControl<String>('', [Validators.required]),
    lastName: new FormControl<String>('', Validators.required),
    login: new FormControl<String>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl<String>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}


  get currentLogin(): Register{
    const login = this.registerForm.value as Register;
    return login;
  }

  onRegister() {
    this.authService.request(
      "POST",
        "/register",
        {
            firstName: this.currentLogin.firstName,
            lastName: this.currentLogin.lastName,
            login: this.currentLogin.user,
            password: this.currentLogin.password
        }).then(
        response => {
            this.authService.setAuthToken(response.data.token);
            console.log("login user created",response.data);
            this.router.navigateByUrl('/collection');
        }).catch(
        error => {
            this.authService.setAuthToken(null);
            this.router.navigateByUrl('/register');
          }
    );
  }

  isValidFiled(field: string): boolean | null {
    const control = this.registerForm.get(field);
    if (!control) {
      console.error(`Control ${field} not found`);
      return null;
    }
    return control.errors && control.touched;
  }

  getFieldError(field: string): string | null {
    const control = this.registerForm.get(field);

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
