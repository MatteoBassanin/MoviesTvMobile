import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieTvService } from 'src/app/services/movie-tv.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-movies-tv',
  templateUrl: './movies-tv.page.html',
  styleUrls: ['./movies-tv.page.scss'],
})
export class MoviesTvPage implements OnInit {
  moviesTv: any = [];
  searchMovieTv: string = '';
  // valore radio
  selectedValue: string = '';





  constructor(private movieTvService: MovieTvService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMoviesTv()
  }

  async getMoviesTv() {
    const search = this.searchMovieTv;
    const type = this.selectedValue;
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'dots',
    });
    await loading.present();

    this.movieTvService.getMovieTv(search, type).subscribe(res => {
      loading.dismiss();
      this.moviesTv = res.Search;
      console.log(res);
      console.log(this.moviesTv);
      console.log(this.searchMovieTv)


    })
  }
  onRadioChange() {
    console.log('Valore selezionato:', this.selectedValue);
    // Puoi eseguire altre azioni in base al valore selezionato
  }


}
