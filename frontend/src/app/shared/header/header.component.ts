import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  constructor(private router:Router){}

  onLogout(){
    this.router.navigateByUrl('/auth/login');
  }
}
