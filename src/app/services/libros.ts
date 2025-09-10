import { Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Libros {
  libros: any[] = [];
  query: string = '';
  private apiKey: string = environment.booksApiKey;
  private Base_url: string = 'https://www.googleapis.com/books/v1/volumes?q=';
  constructor(private http: HttpClient) { }

  buscarLibros(consulta: string): Observable<any> {
    const url = `${this.Base_url}${consulta}&key=${this.apiKey}`;
    console.log(`${this.Base_url}?q=intitle:${consulta}}&key=${this.apiKey}`);
    return this.http.get(url);
  }
  
}
