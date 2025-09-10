import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Busqueda {
   peliculas: any[] = [];
  query: string = '';
}
