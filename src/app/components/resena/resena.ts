import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { ResenaService } from '../../services/resena';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resena',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resena.html',
  styleUrl: './resena.css'
})

export class Resena {
  movie: any;
  reviewText: string = '';
  message: string = '';
  peliculaId!: string;
  resenaForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private reseñaService: ResenaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resenaForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(20)]],
      calificacion: [5, [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    this.route.params.subscribe(params => {
      this.peliculaId = params['peliculaId'];

      // Si vienes desde Home, puedes pasar la película por state
      const nav = this.router.getCurrentNavigation();
      this.movie = nav?.extras.state?.['movie'];

      // Si no viene por state, podrías hacer una llamada a la API aquí
      // Ejemplo: this.movieService.getPeliculaPorId(this.peliculaId).subscribe(...)
    });
  }
  autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; // reset height
  textarea.style.height = textarea.scrollHeight + 'px'; // set to content height
}


irAHome() {
    this.router.navigate(['/home']);
}


  guardarResena() {
      if (!this.authService.userId) {
    this.message = 'Usuario no autenticado.';
    return;
  }


    if (this.resenaForm.invalid || !this.authService.userId) return;

    const data = {
      peliculaId: this.peliculaId,
      comentario: this.resenaForm.value.comentario,
      calificacion: this.resenaForm.value.calificacion,
      usuarioId: this.authService.userId,
      fecha: new Date().toISOString()

    };
     console.log('Reseña a guardar:', data); 
     console.log('Campos válidos:', Object.entries(data).every(([k, v]) => typeof v !== 'undefined' && v !== null));
     this.reseñaService.guardarReseña(data).then(docRef => {
    console.log('Reseña guardada con ID:', docRef.id);
    this.message = '¡Reseña enviada correctamente!';
    this.resenaForm.reset({ calificacion: 5 });
  }).catch(error => {
    console.error('Error al guardar reseña:', error); // ✅ Captura de errores
    this.message = 'Error al guardar la reseña.';
  });

  }
}
