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
    login: new FormControl<String>('', Validators.required),
    password: new FormControl<String>('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  get currentLogin(): Login{
    const login = this.loginForm.value as Login;
    return login;
  }

  onLogin(){
    this.authService.request(
      "POST",
		    "/login",
		    {
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
}
