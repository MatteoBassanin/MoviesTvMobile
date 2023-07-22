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
  moviesTv: any[] = [];
  searchMovieTv: string = '';
  // valore radio
  selectedValue: string = '';

  ratingsMovieTv: any = environment.rating;

  isOrdered: boolean = false;
  isOrderedByYear: string = "desc";

  valuesSelect: any[] = [];

  selectedOption: number = 0;

  selectedOptionTry: string = 'byYear';
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
      if (this.moviesTv && this.isOrderedByYear == "asc") {
        if (this.moviesTv && this.selectedOptionTry == "byYear") {
          this.moviesTv.sort((a: any, b: any) => a.Year.localeCompare(b.Year));
        } else if (this.moviesTv && this.selectedOptionTry == "byAlphabet") {
          this.moviesTv.sort((a: any, b: any) => a.Title.localeCompare(b.Title));
        } else if (this.moviesTv && this.selectedOptionTry == "byRating") {
          this.moviesTv.forEach(element => {
            this.movieTvService.getMovieTvRating(element.imdbID).subscribe((res) => {
              console.log(res.imdbRating);
              const ratingResult = Math.floor(parseFloat(res.imdbRating))
              if (ratingResult >= rating) {
                successRating.push(res);
                this.moviesTv.sort((a: any, b: any) => a.imdbRating.localeCompare(b.imdbRating));
              }
            });
            this.moviesTv = successRating;
          })

        }

      } else if (this.moviesTv && this.isOrderedByYear == "desc")
        if (this.moviesTv && this.selectedOptionTry == "byYear") {
          this.moviesTv.sort((a: any, b: any) => b.Year.localeCompare(a.Year));
        } else if (this.moviesTv && this.selectedOptionTry == "byRating") {
          this.moviesTv.sort((a: any, b: any) => b.Title.localeCompare(a.Title));
        } else {
          this.moviesTv = res.Search;
        }
      // if (this.moviesTv && this.isOrdered) {
      //   this.moviesTv.sort((a: any, b: any) => a.Title.localeCompare(b.Title));
      // }
      // if (this.moviesTv && this.isOrderedByYear == "asc") {
      //   this.moviesTv.sort((a: any, b: any) => a.Year.localeCompare(b.Year));
      // } else if (this.moviesTv && this.isOrderedByYear == "desc") {
      //   this.moviesTv.sort((a: any, b: any) => b.Year.localeCompare(a.Year));
      // } else {
      //   this.moviesTv = res.Search;
      // }



      // if (rating > 0) {
      //   this.moviesTv.forEach(element => {
      //     this.movieTvService.getMovieTvRating(element.imdbID).subscribe((res) => {
      //       console.log(res.imdbRating);
      //       const ratingResult = Math.floor(parseFloat(res.imdbRating))

      //       if (ratingResult >= rating) {
      //         successRating.push(res);

      //       }
      //     });
      //     this.moviesTv = successRating;



      //   })

      // }

      if (this.selectedOptionTry == "byRating") {

        this.moviesTv.forEach(element => {
          this.movieTvService.getMovieTvRating(element.imdbID).subscribe((res) => {
            console.log(res.imdbRating);
            const ratingResult = Math.floor(parseFloat(res.imdbRating))
            if (ratingResult >= rating) {
              successRating.push(res);
              this.moviesTv.sort((a: any, b: any) => b.imdbRating.localeCompare(a.imdbRating));
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

  toggleEvent(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }


}



