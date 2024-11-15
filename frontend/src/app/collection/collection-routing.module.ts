import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlayersComponent } from './pages/list-players/list-players.component';

const routes: Routes = [
  {
    path: '',
    component: ListPlayersComponent
  },
  {
    path: '**',
    redirectTo: 'collection'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
