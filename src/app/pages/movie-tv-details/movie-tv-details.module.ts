import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieTvDetailsPageRoutingModule } from './movie-tv-details-routing.module';

import { MovieTvDetailsPage } from './movie-tv-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieTvDetailsPageRoutingModule
  ],
  declarations: [MovieTvDetailsPage]
})
export class MovieTvDetailsPageModule {}
