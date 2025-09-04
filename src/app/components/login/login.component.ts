import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) { }
  async onLogin() {
    try {
      console.log('Intentando iniciar sesión con:', this.email);
      const result = await this.auth.login(this.email, this.password);
       console.log('Login exitoso:', result.user);

      this.router.navigate(['/home']);
    } catch (error: any) {
      this.error = 'Login failed. Please check your credentials.';
      console.error('Error de login:', error.code, error.message);

    }
  }

}
