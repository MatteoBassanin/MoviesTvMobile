import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieTvService } from 'src/app/services/movie-tv.service';


@Component({
  selector: 'app-movies-tv',
  templateUrl: './movies-tv.page.html',
  styleUrls: ['./movies-tv.page.scss'],
})
export class MoviesTvPage implements OnInit {
  moviesTv: any = [];
  constructor(private movieTvService: MovieTvService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMoviesTv()
  }

  async getMoviesTv() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'dots',
    });
    await loading.present();

    this.movieTvService.getMovieTv().subscribe(res => {
      loading.dismiss();
      this.moviesTv = [...this.moviesTv, ...res.Search];
      console.log(res);
      console.log(this.moviesTv);
    })
  }

}
