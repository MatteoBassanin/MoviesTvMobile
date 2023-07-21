import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieTvService } from 'src/app/services/movie-tv.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-movie-tv-details',
  templateUrl: './movie-tv-details.page.html',
  styleUrls: ['./movie-tv-details.page.scss'],
})
export class MovieTvDetailsPage implements OnInit {
  movieTv: any = null;


  constructor(private route: ActivatedRoute, private movieTvService: MovieTvService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieTvService.getMovieTvDetails(id).subscribe((res) => {
      console.log(res);
      this.movieTv = res;
      environment.rating = res;
      console.log(this.movieTv);
      console.log(environment.rating)

    })
  }

}
