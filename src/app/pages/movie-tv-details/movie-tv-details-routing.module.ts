import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieTvDetailsPage } from './movie-tv-details.page';

const routes: Routes = [
  {
    path: '',
    component: MovieTvDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieTvDetailsPageRoutingModule {}
