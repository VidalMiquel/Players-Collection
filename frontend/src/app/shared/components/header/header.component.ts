import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styles: `
    .icon-image {
      width: 100px; /* Adjust width as needed */
      height: auto; /* Maintains aspect ratio */
    }
  `,
})
export class HeaderComponent  {


  constructor(private router: Router) {}

  onLogout() {
    window.localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
