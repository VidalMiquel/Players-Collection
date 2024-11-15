import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlayersComponent } from './pages/list-players/list-players.component';
import { CollectionRoutingModule } from './collection-routing.module';



@NgModule({
  declarations: [
    ListPlayersComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
