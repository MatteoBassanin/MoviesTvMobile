import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovieTvService {

  constructor(private http: HttpClient) { }

  getMovieTv(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/?apikey=${environment.apiKey}&t=blade+runner`);
  }

  getMovieTvDetails() {

  }
}
