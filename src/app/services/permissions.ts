import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { Users } from './users';
import { Permission, RoleId, ROLES } from '../models/user.model';

@Service()
export class Permissions {
  private readonly state = inject(AppState);
  private readonly users = inject(Users);

  readonly usuarioActual = computed(() => this.state.usuarioActual());

  tienePermiso(permiso: Permission): boolean {
    const rol = this.usuarioActual()?.rol;
    if (!rol) return false;
    if (rol === 'admin') return true;
    const permisos = this.users.permisosDeRol(rol as RoleId);
    return permisos.includes(permiso);
  }

  tieneCualquiera(permisos: Permission[]): boolean {
    return permisos.some((p) => this.tienePermiso(p));
  }

  tieneTodos(permisos: Permission[]): boolean {
    return permisos.every((p) => this.tienePermiso(p));
  }

  permisosDeArea(area: 'pedidos' | 'facturacion' | 'clientes' | 'inventario' | 'informes' | 'ajustes'): Permission[] {
    const prefijo = area === 'facturacion' ? 'facturacion' : area;
    return Object.keys(this.tienePermiso.bind(this)).filter((k) => k.startsWith(`${prefijo}.`)) as Permission[];
  }

  catalogo(): { area: string; permisos: Permission[] }[] {
    const areas = ['pedidos', 'facturacion', 'clientes', 'inventario', 'informes', 'ajustes'] as const;
    return areas.map((area) => ({ area, permisos: this.permisosDeArea(area) }));
  }
}