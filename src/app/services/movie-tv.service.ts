import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


export interface ApiResult {
  Search: any[];
  Error: string;
  // Response: string;


}
@Injectable({
  providedIn: 'root'
})
export class MovieTvService {

  private apiKey: string = 'f980ce85';
  private baseUrl: string = 'https://www.omdbapi.com/';
  private imgApi: string = 'https://img.omdbapi.com/';

  constructor(private http: HttpClient) { }

  getMovieTv(page = 1, search: string, type: string): Observable<ApiResult> {
    const searchText = search ? search : '';
    const radioResult = type ? type : '';
    return this.http.get<ApiResult>(`${this.baseUrl}/?apikey=${this.apiKey}&s=${searchText}&type=${radioResult}&page=${page}`);
  }

  getMovieTvDetails(id: any) {
    return this.http.get(`${this.baseUrl}/?apikey=${this.apiKey}&i=${id}`);
  }

  getPoster(id: any) {
    return this.http.get(`${this.imgApi}/?apikey=${this.apiKey}&i=${id}`)
  }


  getMovieTvRating(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/?apikey=${this.apiKey}&i=${id}`);
  }
}
