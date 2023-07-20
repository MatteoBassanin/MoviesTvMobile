import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesTvPageRoutingModule } from './movies-tv-routing.module';

import { MoviesTvPage } from './movies-tv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesTvPageRoutingModule
  ],
  declarations: [MoviesTvPage]
})
export class MoviesTvPageModule {}
