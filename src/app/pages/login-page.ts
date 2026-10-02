import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Users } from '../services/users';
import { UiCard } from '../shared/components/ui-card';
import { UiButton } from '../shared/components/ui-button';
import { UiInput } from '../shared/components/ui-input';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, UiCard, UiButton, UiInput],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly auth = inject(Auth);
  private readonly users = inject(Users);
  readonly usuario = signal('');
  readonly password = signal('');
  readonly error = signal('');

  readonly usuariosDisponibles = computed(() => this.users.lista().filter((u) => u.estado === 'activo'));

  login(): void {
    const u = this.usuariosDisponibles().find((usr) => usr.email === this.usuario());
    if (u) {
      this.auth.login(u);
      this.error.set('');
    } else {
      this.error.set('Usuario no encontrado');
    }
  }
}
