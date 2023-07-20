import { Component, OnInit } from '@angular/core';
import { MovieTvService } from 'src/app/services/movie-tv.service';

@Component({
  selector: 'app-movies-tv',
  templateUrl: './movies-tv.page.html',
  styleUrls: ['./movies-tv.page.scss'],
})
export class MoviesTvPage implements OnInit {

  constructor(private movieTvService: MovieTvService) { }

  ngOnInit() {
    this.movieTvService.getMovieTv().subscribe(res => {
      console.log(res);
    })
  }

}
