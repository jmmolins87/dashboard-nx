import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { Notifications } from './notifications';
import { Users } from './users';
import { Router } from '@angular/router';
import { AppUser, AuthSession } from '../models/app-user.model';

@Service()
export class Auth {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly notifications = inject(Notifications);
  private readonly users = inject(Users);
  private readonly router = inject(Router);

  readonly sesionActiva = computed(() => this.state.usuarioActual() !== null);
  readonly usuario = computed(() => this.state.usuarioActual());

  login(usuario: User): void {
    const appUser: AppUser = {
      id: usuario.id,
      nombreCompleto: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      iniciales: usuario.nombre.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
      ultimoAcceso: new Date().toISOString(),
      preferencias: { tema: 'claro', densidad: 'comoda', moneda: 'EUR', notificacionesEmail: true },
    };
    this.state.setUsuarioActual(appUser);
    this.notifications.exito('Bienvenido', `Has iniciado sesión como ${usuario.nombre}`);
    this.router.navigate(['/']);
  }

  logout(): void {
    this.state.setUsuarioActual(null);
    this.notifications.info('Sesión cerrada', 'Hasta pronto');
    this.router.navigate(['/login']);
  }

  sesionDemo(): void {
    const admin = this.users.usuarioPorId('USR-0001');
    if (admin) this.login(admin);
  }
}

import { User } from '../models/user.model';