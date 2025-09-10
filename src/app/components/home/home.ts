import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tmdb } from '../../services/tmdb';
import { AuthService } from '../../services/auth';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Libros} from '../../services/libros';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  searchText: string = '';
  isBookSearch: boolean = false;
  isMovieSearch: boolean = true;
  loading: boolean = false;
  books: any[] = [];
  movies: any[] = [];

  constructor(
    private tmdb: Tmdb,
    private auth: AuthService,
    private router: Router,
    private LibrosService: Libros
  ) {}

  ngOnInit() {
    if (this.tmdb.peliculas.length > 0) {
      this.movies = this.tmdb.peliculas;
    }
  }

  setSearchType(type: 'book' | 'movie') {
    if (type === 'book') {
      this.isBookSearch = true;
      this.isMovieSearch = false;
    } else {
      this.isBookSearch = false;
      this.isMovieSearch = true;
    }
     if (this.searchText.trim()) {
    this.unifiedSearch();
  }
  }

  unifiedSearch() {
    if (!this.searchText.trim()) return;
    if (this.isBookSearch) {
      this.LibrosService.buscarLibros(this.searchText).subscribe((res: any) => {
        this.LibrosService.libros = res.items;
        this.LibrosService.query = this.searchText;
        this.books = res.items;
        this.movies = [];
      });
    } else {
      this.tmdb.searchMovies(this.searchText).subscribe((res: any) => {
        this.tmdb.peliculas = res.results;
        this.tmdb.query = this.searchText;
        this.movies = res.results;
        this.books = [];
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