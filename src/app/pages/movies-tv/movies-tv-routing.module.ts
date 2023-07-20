import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesTvPage } from './movies-tv.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesTvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesTvPageRoutingModule {}
