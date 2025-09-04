import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tmdb } from '../../services/tmdb';
import { AuthService } from '../../services/auth';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
constructor(private tmdb: Tmdb,
private auth: AuthService, private router: Router) {}

  movies: any[] = [];

  search(query: string) {
    this.tmdb.searchMovies(query).subscribe((res: any) => {
      this.movies = res.results;
    });
  }

irAResena(movie: any) {
  this.router.navigate(['/resena', movie.id], { state: { movie } });
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
