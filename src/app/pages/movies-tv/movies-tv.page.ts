import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Env } from 'ionicons/dist/types/stencil-public-runtime';
import { MovieTvService } from 'src/app/services/movie-tv.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-movies-tv',
  templateUrl: './movies-tv.page.html',
  styleUrls: ['./movies-tv.page.scss'],
})
export class MoviesTvPage implements OnInit {
  moviesTv: any[] = [];
  searchMovieTv: string = '';
  // valore radio
  selectedValue: string = '';

  ratingsMovieTv: any = environment.rating;

  isOrdered: boolean = false;
  isOrderedByYear: any;

  valuesSelect: any[] = [];

  selectedOption: number = 0;


  constructor(private movieTvService: MovieTvService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMoviesTv(),
      this.selectValues()

  }

  async getMoviesTv() {

    const search = this.searchMovieTv;
    const type = this.selectedValue;
    const rating = this.selectedOption;
    const successRating: any[] = [];
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
      if (this.moviesTv && this.isOrderedByYear == "asc") {
        this.moviesTv.sort((a: any, b: any) => a.Year.localeCompare(b.Year));
      } else if (this.moviesTv && this.isOrderedByYear == "desc") {
        this.moviesTv.sort((a: any, b: any) => b.Year.localeCompare(a.Year));
      } else {
        this.moviesTv = res.Search;
      }

      if (rating > 0) {
        this.moviesTv.forEach(element => {
          this.movieTvService.getMovieTvRating(element.imdbID).subscribe((res) => {
            console.log(res.imdbRating);
            const ratingResult = Math.floor(parseFloat(res.imdbRating))

            if (ratingResult >= rating) {
              successRating.push(res);
            }
          });
          this.moviesTv = successRating;



        })

      }

      console.log(res);
      console.log(this.moviesTv);
      console.log(this.searchMovieTv);
      console.log(environment.rating);

    })
  }
  onRadioChange() {
    console.log(this.isOrderedByYear);
    console.log(this.selectedValue);
    this.getMoviesTv();
  }

  selectValues() {
    const selectArray = [];
    for (let i = 0; i <= 10; i++) {
      selectArray.push(i);
    }
    this.valuesSelect = selectArray;

  }
}



