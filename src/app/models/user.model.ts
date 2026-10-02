export type RoleId = 'admin' | 'gestor' | 'comercial' | 'operario' | 'consulta';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: RoleId;
  estado: 'activo' | 'inactivo' | 'bloqueado';
  ultimoAcceso: string;
  avatar?: string;
}

export interface Role {
  id: RoleId;
  nombre: string;
  descripcion: string;
  permisos: Permission[];
}

export type Permission =
  | 'pedidos.ver'
  | 'pedidos.crear'
  | 'pedidos.editar'
  | 'pedidos.cancelar'
  | 'pedidos.exportar'
  | 'facturacion.ver'
  | 'facturacion.crear'
  | 'facturacion.registrar-pago'
  | 'facturacion.exportar'
  | 'clientes.ver'
  | 'clientes.crear'
  | 'clientes.editar'
  | 'clientes.exportar'
  | 'inventario.ver'
  | 'inventario.editar'
  | 'inventario.ajustar-stock'
  | 'inventario.exportar'
  | 'informes.ver'
  | 'informes.exportar'
  | 'ajustes.ver'
  | 'ajustes.usuarios'
  | 'ajustes.preferencias';

export const PERMISSION_LABELS: Record<Permission, string> = {
  'pedidos.ver': 'Ver pedidos',
  'pedidos.crear': 'Crear pedidos',
  'pedidos.editar': 'Editar pedidos',
  'pedidos.cancelar': 'Cancelar pedidos',
  'pedidos.exportar': 'Exportar pedidos',
  'facturacion.ver': 'Ver facturación',
  'facturacion.crear': 'Crear facturas',
  'facturacion.registrar-pago': 'Registrar pagos',
  'facturacion.exportar': 'Exportar facturas',
  'clientes.ver': 'Ver clientes',
  'clientes.crear': 'Crear clientes',
  'clientes.editar': 'Editar clientes',
  'clientes.exportar': 'Exportar clientes',
  'inventario.ver': 'Ver inventario',
  'inventario.editar': 'Editar productos',
  'inventario.ajustar-stock': 'Ajustar stock',
  'inventario.exportar': 'Exportar inventario',
  'informes.ver': 'Ver informes',
  'informes.exportar': 'Exportar informes',
  'ajustes.ver': 'Ver ajustes',
  'ajustes.usuarios': 'Gestionar usuarios',
  'ajustes.preferencias': 'Editar preferencias',
};

export const ROLES: Role[] = [
  {
    id: 'admin',
    nombre: 'Administrador',
    descripcion: 'Acceso total al sistema',
    permisos: [
      'pedidos.ver',
      'pedidos.crear',
      'pedidos.editar',
      'pedidos.cancelar',
      'pedidos.exportar',
      'facturacion.ver',
      'facturacion.crear',
      'facturacion.registrar-pago',
      'facturacion.exportar',
      'clientes.ver',
      'clientes.crear',
      'clientes.editar',
      'clientes.exportar',
      'inventario.ver',
      'inventario.editar',
      'inventario.ajustar-stock',
      'inventario.exportar',
      'informes.ver',
      'informes.exportar',
      'ajustes.ver',
      'ajustes.usuarios',
      'ajustes.preferencias',
    ],
  },
  {
    id: 'gestor',
    nombre: 'Gestor',
    descripcion: 'Gestión operativa completa',
    permisos: [
      'pedidos.ver',
      'pedidos.crear',
      'pedidos.editar',
      'pedidos.exportar',
      'facturacion.ver',
      'facturacion.crear',
      'facturacion.registrar-pago',
      'facturacion.exportar',
      'clientes.ver',
      'clientes.crear',
      'clientes.editar',
      'clientes.exportar',
      'inventario.ver',
      'inventario.editar',
      'inventario.ajustar-stock',
      'inventario.exportar',
      'informes.ver',
      'informes.exportar',
      'ajustes.ver',
      'ajustes.preferencias',
    ],
  },
  {
    id: 'comercial',
    nombre: 'Comercial',
    descripcion: 'Ventas y clientes',
    permisos: [
      'pedidos.ver',
      'pedidos.crear',
      'pedidos.editar',
      'facturacion.ver',
      'clientes.ver',
      'clientes.crear',
      'clientes.editar',
      'inventario.ver',
      'informes.ver',
      'ajustes.ver',
    ],
  },
  {
    id: 'operario',
    nombre: 'Operario',
    descripcion: 'Operaciones de almacén',
    permisos: [
      'pedidos.ver',
      'inventario.ver',
      'inventario.editar',
      'inventario.ajustar-stock',
      'ajustes.ver',
    ],
  },
  {
    id: 'consulta',
    nombre: 'Solo consulta',
    descripcion: 'Acceso de solo lectura',
    permisos: [
      'pedidos.ver',
      'facturacion.ver',
      'clientes.ver',
      'inventario.ver',
      'informes.ver',
      'ajustes.ver',
    ],
  },
];

export function permisosDeRol(id: RoleId): Permission[] {
  return ROLES.find((r) => r.id === id)?.permisos ?? [];
}