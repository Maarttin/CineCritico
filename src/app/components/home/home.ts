
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tmdb } from '../../services/tmdb';
import { AuthService } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Libros } from '../../services/libros';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  searchText: string = '';
  tipoBusqueda: string = ''; // 'libro' o 'pelicula'
  loading: boolean = false;
  books: any[] = [];
  movies: any[] = [];
  busqueda = false;
  resultadosCargados = false;
  busquedaManual = false;
onBuscarClick() {
  this.busquedaManual = true;
  this.unifiedSearch();
}
  constructor(
    private tmdb: Tmdb,
    private auth: AuthService,
    private router: Router,
    private LibrosService: Libros
  ) { }

  ngOnInit() {
    if (this.tmdb.peliculas.length > 0) {
      this.movies = this.tmdb.peliculas;
    }
  }
  clean(){
    this.searchText = '';
     this.tipoBusqueda = ''; 
  }
  onTipoBusquedaChange() {
    if (this.searchText.trim()) {
      this.unifiedSearch();
    }
    this.busquedaManual = false;
  }
  onSearchTextChange(valor: string) {
    this.searchText = valor;
    if (!valor.trim()) {
      this.tipoBusqueda = ''; // Reinicia el tipo si el campo queda vacío
      this.limpiarResultados();

    }
  }
   limpiarResultados() {
      this.books = [];
      this.movies = [];
      this.busqueda = false;
    }
  unifiedSearch() {

    if (!this.searchText.trim()) {

      alert('Escribe algo para buscar.');
      return;
    }
    if (!this.tipoBusqueda) {
      alert('Por favor selecciona si quieres buscar libros o películas.');
      return;
    }
   

    this.busqueda = true;
    this.resultadosCargados = false;
    if (this.tipoBusqueda === 'libro') {
      this.LibrosService.buscarLibros(this.searchText).subscribe((res: any) => {
        this.LibrosService.libros = res.items;
        this.LibrosService.query = this.searchText;
        this.books = res.items;
        this.movies = [];
        this.resultadosCargados = true;

      });
    } else {
      this.tmdb.searchMovies(this.searchText).subscribe((res: any) => {
        this.tmdb.peliculas = res.results;
        this.tmdb.query = this.searchText;
        this.movies = res.results;
        this.books = [];
        this.resultadosCargados = true;

      });
    }

  }

  irAResena(movie: any) {
    this.router.navigate(['/resena', movie.id], { state: { movie } });
  }

  irAMisResenas() {
    this.router.navigate(['/misresenas']);
  }

  async onLogout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

}