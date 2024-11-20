import { Component, Input } from '@angular/core';
import { Player } from '../../interfaces/Player';

@Component({
  selector: 'collection-player-card',
  templateUrl: './player-card.component.html',
  styles: ``
})
export class PlayerCardComponent {

  @Input()
  public player?: Player;

}
