import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class Tmdb {
  peliculas: any[] = [];
  query: string = '';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }
  searchMovies(query: string) {
    console.log('Buscando películas con la consulta:', query);
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: environment.tmdbApiKey,
        query: query
      }
    });
  }
  getMovieDetails(movieId: number) {
    return this.http.get(`${this.baseUrl}/movie/${movieId}`, {
      params: {
        api_key: environment.tmdbApiKey
      }
    });
    
  }
}
