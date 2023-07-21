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

  getMovieTv(search: string, type: string): Observable<ApiResult> {
    const searchText = search ? search : '';
    const radioResult = type ? type : '';
    return this.http.get<ApiResult>(`${environment.baseUrl}/?apikey=${environment.apiKey}&s=${searchText}&type=${radioResult}`);
  }

  getMovieTvDetails(id: any) {
    return this.http.get(`${environment.baseUrl}/?apikey=${environment.apiKey}&i=${id}`);
  }

  getPoster(id: any) {
    return this.http.get(`${environment.imgApi}/?apikey=${environment.apiKey}&i=${id}`)
  }


  getMovieTvRating(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/?apikey=${environment.apiKey}&i=${id}`);
  }
}
