import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  user$ = this.currentUserSubject.asObservable();
    constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.currentUserSubject.next(user);
    });
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

    get userId(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }

}