import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlayersComponent } from './pages/list-players/list-players.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { SharedModule } from "../shared/shared.module";
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerCardComponent } from './components/player-card/player-card.component';



@NgModule({
  declarations: [
    ListPlayersComponent,
    FilterComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class CollectionModule { }
