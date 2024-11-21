import { Component, Input } from '@angular/core';
import { Filter } from '../../../collection/interfaces/Filter';

@Component({
  selector: 'shared-search-messages',
  templateUrl: './search-messages.component.html',
  styles: `
  .logo-img{
      width: 35px; /* Adjust width as needed */
      height: auto; /* Maintains aspect ratio */
    }
  `
})
export class SearchMessagesComponent {

  @Input() filter: Filter | null = null;
  @Input() isEmpty?: boolean;

}

