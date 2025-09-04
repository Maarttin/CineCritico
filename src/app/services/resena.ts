import { HttpClient } from '@angular/common/http';
import { Injectable , inject, runInInjectionContext, Injector} from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {environment} from '../environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ResenaService {
    private firestore = inject(Firestore); 
    private injector = inject(Injector);
   constructor( private http:HttpClient) {}

   getPeliculaPorId(id: string) {
    const apiKey = environment.tmdbApiKey;
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
  }

  guardarReseña(reseña: any) {
  return runInInjectionContext( this.injector, () => {
    const reseñasRef = collection(this.firestore, 'resenas');
    return addDoc(reseñasRef, reseña);
  });
}


}
