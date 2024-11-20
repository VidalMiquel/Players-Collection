import { Component } from '@angular/core';
import { CollectionService } from '../../services/collection-service.service';
import { Filter } from '../../interfaces/Filter';
import { Player } from '../../interfaces/Player';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styles: ``,
})
export class ListPlayersComponent {
  data: string[] = [];
  players: Player[] = [];

  constructor(private collectionService: CollectionService) {}

  appliedFilter: Filter | null = null;

  onFilterChange(filter: Filter) {
    this.appliedFilter = filter;
    console.log('Father filter', this.appliedFilter);
    this.getPlayers();
  }

  ngOnInit(): void {
    this.collectionService.request('GET', '/messages', {}).then((response) => {
      this.data = response.data;
    });
  }

  getPlayers(): void {
    console.log("applaied filter", this.appliedFilter)
    const url = this.buildUrlWithParams('', this.appliedFilter);
    this.collectionService
      .request('GET', url, ({}))
      .then((response) => {
        console.log("responseGET: ", response);
        // this.players = response.data;
      })
      .catch(this.handleError);
  }

  private buildUrlWithParams(baseUrl: string, filter?: Filter | null): string {
    const params = new URLSearchParams();

    if (filter?.team && filter.team !== 'No team') {
      params.append('team', filter.team);
    }

    if (filter?.position && filter.position !== 'No position') {
      params.append('position', filter.position);
    }
    console.log('params: ', params.toString());
    return `${baseUrl}?${params.toString()}`;
  }

  private handleError(error: any): void {
    console.error('Error getting players:', error);
  }
}
