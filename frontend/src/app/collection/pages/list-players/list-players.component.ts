import { Component } from '@angular/core';
import { CollectionService } from '../../services/collection-service.service';
import { Filter } from '../../interfaces/Filter';
import { Player } from '../../interfaces/Player';
import { Team } from '../../enums/Team';
import { Position } from '../../enums/Position';
import { Nationality } from '../../enums/Nationality';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styles: ``,
})
export class ListPlayersComponent {
  players : Player [] = []
  appliedFilter: Filter | null = null;
  isEmpty: boolean =  false;
  isSearch:boolean = false;
  showModal: boolean = false;
  error: Error = {
    name: "Token error",
    message: ""
  }


  constructor(private collectionService: CollectionService) {}

  onFilterChange(filter: Filter) {
    this.appliedFilter = filter;
    this.getPlayers();
  }

  noPlayers(){
    this.isEmpty = this.players.length === 0;
  }

  getPlayers(): void {
    this.showModal = false;
    const url = this.buildUrlWithParams('', this.appliedFilter);
    this.collectionService
      .request('GET', url, {})
      .then((response) => {
        this.isSearch = true;
        this.players = response.data;
        console.log(this.players)
        this.noPlayers()
      })
      .catch(error => this.handleError(error));
  }

  private buildUrlWithParams(baseUrl: string, filter?: Filter | null): string {
    const params = new URLSearchParams();

    const { team, position, nationality } = filter || {};

    if (team && team !== Team.DEFAULT) {
      params.append('team', team);
    }

    if (position && position !== Position.DEFAULT) {
      params.append('position', position);
    }

    if (nationality && nationality !== Nationality.DEFAULT) {
      params.append('nationality', nationality);
    }

    console.log('params: ', params.toString());
    return `${baseUrl}?${params.toString()}`;
  }


  private handleError(error: any): void {
    this.players = [];
    this.isSearch = false;
    this.showModal = true;
    this.error.message = error.response.data.error;
  }
}
