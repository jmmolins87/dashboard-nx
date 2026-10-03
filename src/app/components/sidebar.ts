import { Component, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Permissions } from '../services/permissions';
import { Auth } from '../services/auth';
import { Permission } from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly permissions = inject(Permissions);
  private readonly auth = inject(Auth);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly colapsado = signal(this.esMobile());

  private esMobile(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;
    return this.document.defaultView?.matchMedia('(max-width: 768px)').matches ?? false;
  }

  readonly areas = computed(() => [
    { id: 'pedidos', label: 'Pedidos', icono: '📦', ruta: '/pedidos', permiso: 'pedidos.ver' as Permission },
    { id: 'facturacion', label: 'Facturación', icono: '🧾', ruta: '/facturacion', permiso: 'facturacion.ver' as Permission },
    { id: 'clientes', label: 'Clientes', icono: '👥', ruta: '/clientes', permiso: 'clientes.ver' as Permission },
    { id: 'inventario', label: 'Inventario', icono: '📦', ruta: '/inventario', permiso: 'inventario.ver' as Permission },
    { id: 'informes', label: 'Informes', icono: '📊', ruta: '/informes', permiso: 'informes.ver' as Permission },
    { id: 'ajustes', label: 'Ajustes', icono: '⚙️', ruta: '/ajustes/usuarios', permiso: 'ajustes.ver' as Permission },
  ].filter((a) => this.permissions.tienePermiso(a.permiso)));

  alternar(): void {
    this.colapsado.update((c) => !c);
  }

  logout(): void {
    this.auth.logout();
  }
}