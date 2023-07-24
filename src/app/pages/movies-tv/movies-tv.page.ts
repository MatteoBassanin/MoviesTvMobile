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

    this.movieTvService.getMovieTv(page, search, type).subscribe(res => {

      this.moviesTv = res.Search;

      if (this.moviesTv) {
        switch (this.isOrderedByYear) {
          case "asc":
            this.sortMoviesTv(this.selectedOptionTry, "asc");
            break;
          case "desc":
            this.sortMoviesTv(this.selectedOptionTry, "desc");
            break;
          default:
            break;
        }
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

  sortMoviesTv(option: string, order: "asc" | "desc") {
    const successRating: any[] = [];
    const rating = this.selectedOption;
    switch (option) {
      case "byYear":
        this.moviesTv.sort((a: any, b: any) => (order === "asc" ? a.Year.localeCompare(b.Year) : b.Year.localeCompare(a.Year)));
        break;
      case "byAlphabet":
        this.moviesTv.sort((a: any, b: any) => (order === "asc" ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title)));
        break;
      case "byRating":
        this.moviesTv.forEach((element) => {
          this.movieTvService.getMovieTvRating(element.imdbID).subscribe((res) => {
            console.log(res.imdbRating);
            const ratingResult = Math.floor(parseFloat(res.imdbRating))
            if (ratingResult >= rating) {
              successRating.push(res);
            }
            if (this.moviesTv.length === successRating.length) {
              this.moviesTv = successRating.sort((a: any, b: any) => (order === "asc" ? a.imdbRating.localeCompare(b.imdbRating) : b.imdbRating.localeCompare(a.imdbRating)));
            }
          });
        });
        break;
      default:
        break;
    }
  }
}










