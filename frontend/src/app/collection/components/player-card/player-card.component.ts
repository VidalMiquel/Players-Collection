import { Component, Input } from '@angular/core';
import { Player } from '../../interfaces/Player';

@Component({
  selector: 'collection-player-card',
  templateUrl: './player-card.component.html',
  styles: `
  .flag-image {
    width: 25px; /* Adjust width as needed */
    height: auto; /* Maintains aspect ratio */
  }
`,
})
export class PlayerCardComponent {
  @Input()
  public player?: Player;
}
