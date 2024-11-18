import { Component } from '@angular/core';
import { CollectionService } from '../../services/collection-service.service';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styles: ``
})
export class ListPlayersComponent {

  data: string[] = [];

  constructor(private collectionService: CollectionService){}

  ngOnInit():void{
    this.collectionService.request(
      "GET",
      "/messages",
      ({})
    ).then(response => {
      this.data = response.data;
    })
  }
}
