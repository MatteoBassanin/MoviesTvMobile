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

  isOrdered: boolean = false;
  isOrderedByYear: any;





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

      if (this.moviesTv && this.isOrdered) {
        this.moviesTv.sort((a: any, b: any) => a.Title.localeCompare(b.Title));
      }
      if (this.moviesTv && this.isOrderedByYear == "false") {
        this.moviesTv.sort((a: any, b: any) => a.Year.localeCompare(b.Year));
      }
      if (this.moviesTv && this.isOrderedByYear == "true") {
        this.moviesTv.sort((a: any, b: any) => b.Year.localeCompare(a.Year));
      }

      console.log(res);
      console.log(this.moviesTv);
      console.log(this.searchMovieTv)


    })
  }
  onRadioChange() {
    console.log(this.isOrderedByYear);
    console.log(this.selectedValue);
    this.getMoviesTv();
  }


}
