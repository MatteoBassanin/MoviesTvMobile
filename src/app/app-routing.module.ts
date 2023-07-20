import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies-tv',
    pathMatch: 'full'
  },
  {
    path: 'movies-tv',
    loadChildren: () => import('./pages/movies-tv/movies-tv.module').then(m => m.MoviesTvPageModule)
  },
  {
    path: 'movies-tv/:id',
    loadChildren: () => import('./pages/movie-tv-details/movie-tv-details.module').then(m => m.MovieTvDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
