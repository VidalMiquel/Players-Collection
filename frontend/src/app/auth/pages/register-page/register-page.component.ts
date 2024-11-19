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

  errorMessage: string | null = null;
  showModal: boolean = false;

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

  constructor(private authService: AuthService, private router: Router) { }


  get currentRegister(): Register {
    const login = this.registerForm.value as Register;
    return login;
  }

  onRegister() {
    this.showModal = false;
    this.loginRequest();
  }

  loginRequest(){
    const { firstName, lastName, login, password } = this.currentRegister;

    this.authService.request('POST', '/register', { firstName, lastName, login, password })
      .then(response => {
        this.authService.setAuthToken(response.data.token);
        this.router.navigateByUrl('/collection');
      })
      .catch(() => {
        this.handleRegistrationError();
      });
  }

  private handleRegistrationError() {
    this.authService.setAuthToken(null);
    this.registerForm.reset();
    this.errorMessage = "User already exists. Login!";
    this.showModal = true; // Show the modal
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
