import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Permissions } from '../services/permissions';
import { Auth } from '../services/auth';
import { UiButton } from '../shared/components/ui-button';
import { UiModal } from '../shared/components/ui-modal';
import { UiToastContainer } from '../shared/components/ui-toast-container';
import { Permission } from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, RouterLink, RouterLinkActive, UiButton, UiModal, UiToastContainer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly permissions = inject(Permissions);
  private readonly auth = inject(Auth);
  readonly colapsado = signal(false);

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