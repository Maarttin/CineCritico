import { Component, OnInit, inject, NgZone } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs'; import { collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-misresenas',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './misresenas.html',
  styleUrls: ['./misresenas.css']
})
export class Misresenas implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  resenas: any[] = [];
  resenas$!: Observable<any[]>;
  mostrarLibros: boolean = false;
  mostrarPeliculas: boolean = false;
  tipoResena: 'libro' | 'pelicula' = 'libro';

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) return;

    const resenasRef = collection(this.firestore, 'resenas');
    const q = query(resenasRef, where('usuarioId', '==', user.uid));
    this.resenas$ = collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  setTipoResena(tipo: 'libro' | 'pelicula') {
    
      if (tipo === 'libro') {
        this.mostrarLibros = true;
        this.mostrarPeliculas = false;
      } else {
        this.mostrarLibros = false;
        this.mostrarPeliculas = true;
      }

    
  }

  constructor(private router: Router) { }
  irAHome() {
    this.router.navigate(['/home']);
  }
  resenaEditando: any = null;

  editarResena(resena: any) {
    this.resenaEditando = { ...resena }; // copia para edición
  }

  cancelarEdicion() {
    this.resenaEditando = null;
  }

  async guardarEdicion() {
    const ref = doc(this.firestore, 'resenas', this.resenaEditando.id);
    await updateDoc(ref, {
      comentario: this.resenaEditando.comentario,
      calificacion: this.resenaEditando.calificacion
    });
    this.resenaEditando = null;
  }
  eliminarResena(id: string) {
    if (!confirm('¿Seguro que quieres eliminar esta reseña?')) return;

    const resenaRef = doc(this.firestore, 'resenas', id);
    deleteDoc(resenaRef);
  }
}
