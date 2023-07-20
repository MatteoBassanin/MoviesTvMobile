import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  Search: any[];


}
@Injectable({
  providedIn: 'root'
})
export class MovieTvService {


  constructor(private http: HttpClient) { }

  getMovieTv(): Observable<ApiResult> {

    return this.http.get<ApiResult>(`${environment.baseUrl}/?apikey=${environment.apiKey}&s=blade+runner`);
  }

  getMovieTvDetails(id: any) {
    return this.http.get(`${environment.baseUrl}/?apikey=${environment.apiKey}&i=${id}`);
  }
}
