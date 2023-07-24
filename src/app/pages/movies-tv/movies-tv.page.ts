import { Component, OnInit } from '@angular/core';
import { MovieTvService } from 'src/app/services/movie-tv.service';




@Component({
  selector: 'app-movies-tv',
  templateUrl: './movies-tv.page.html',
  styleUrls: ['./movies-tv.page.scss'],
})
export class MoviesTvPage implements OnInit {

  moviesTv: any[] = [];
  searchMovieTv: string = '';
  // valore radio Movie/Tv
  selectedValue: string = '';
  isOrdered: boolean = false;
  isOrderedByYear: string = "desc";
  feedbackError: string = '';
  valuesSelect: any[] = [];
  selectedOption: number = 0;
  page: number = 1;
  selectedOptionTry: string = 'byYear';
  selectDarkLight: boolean = true;


  constructor(private movieTvService: MovieTvService) { }

  ngOnInit() {
    this.getMoviesTv()
  }

  async getMoviesTv() {

    const page = this.page
    const search = this.searchMovieTv.trim();
    const type = this.selectedValue;
    const rating = this.selectedOption;
    const successRating: any[] = [];


    this.movieTvService.getMovieTv(page, search, type).subscribe(res => {

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
        } else if (this.moviesTv && this.selectedOptionTry == "byAlphabet") {
          this.moviesTv.sort((a: any, b: any) => b.Title.localeCompare(a.Title));
        } else if (this.selectedOptionTry == "byRating") {

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

      if (res.Error && res.Error == 'Too many results.') {
        this.feedbackError = 'Too many results, please try to be more specific.';
      } else {
        this.feedbackError = '';
      }
      console.log(res);
      console.log(this.moviesTv);
      console.log(this.searchMovieTv);
    })
  }
  onRadioChange() {
    console.log(this.isOrderedByYear);
    this.getMoviesTv();
  }


  toggleEvent(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      this.selectDarkLight = false;
      console.log(this.selectDarkLight);
    } else {
      document.body.setAttribute('color-theme', 'light');
      this.selectDarkLight = true;
      console.log(this.selectDarkLight);
    }
  }

}



