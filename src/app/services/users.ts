import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { User, RoleId, Role, ROLES, Permission } from '../models/user.model';

@Service()
export class Users {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);

  readonly lista = computed(() => this.state.usuarios());
  readonly porRol = computed(() => this.state.usuariosPorRol());

  usuarioPorId(id: string): User | undefined {
    return this.state.usuarios().find((u) => u.id === id);
  }

  guardarUsuario(usuario: User): void {
    const existe = this.state.usuarios().some((u) => u.id === usuario.id);
    if (existe) {
      this.state.usuarios.update((l) => l.map((u) => (u.id === usuario.id ? usuario : u)));
    } else {
      this.state.usuarios.update((l) => [usuario, ...l]);
      this.eventBus.emit('user-created', { usuario });
    }
  }

  eliminarUsuario(id: string): void {
    this.state.usuarios.update((l) => l.filter((u) => u.id !== id));
    this.eventBus.emit('user-deleted', { usuarioId: id });
  }

  roles(): Role[] {
    return ROLES;
  }

  permisosDeRol(rol: RoleId): Permission[] {
    return ROLES.find((r) => r.id === rol)?.permisos ?? [];
  }

  crearNuevo(): User {
    return {
      id: `USR-NEW-${Date.now()}`,
      nombre: '',
      email: '',
      rol: 'consulta',
      estado: 'activo',
      ultimoAcceso: new Date().toISOString(),
    };
  }
}