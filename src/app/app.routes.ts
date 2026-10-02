import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { permissionGuard } from './guards/permission-guard';
import { adminGuard } from './guards/admin-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { reportsEnabledGuard } from './guards/reports-enabled-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page').then((m) => m.HomePage),
    title: 'Panel de control',
    canActivate: [authGuard, permissionGuard('pedidos.ver')],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page').then((m) => m.LoginPage),
    title: 'Iniciar sesión',
  },
  // Pedidos
  {
    path: 'pedidos',
    loadComponent: () => import('./pages/orders-page').then((m) => m.OrdersPage),
    title: 'Pedidos',
    canActivate: [authGuard, permissionGuard('pedidos.ver')],
  },
  {
    path: 'pedidos/:id',
    loadComponent: () => import('./pages/order-detail-page').then((m) => m.OrderDetailPage),
    title: 'Detalle de pedido',
    canActivate: [authGuard, permissionGuard('pedidos.ver')],
  },
  {
    path: 'pedidos/:id/editar',
    loadComponent: () => import('./pages/order-edit-page').then((m) => m.OrderEditPage),
    title: 'Editar pedido',
    canActivate: [authGuard, permissionGuard('pedidos.editar')],
    canDeactivate: [unsavedChangesGuard],
  },
  // Facturación
  {
    path: 'facturacion',
    loadComponent: () => import('./pages/invoices-page').then((m) => m.InvoicesPage),
    title: 'Facturación',
    canActivate: [authGuard, permissionGuard('facturacion.ver')],
  },
  {
    path: 'facturacion/:id',
    loadComponent: () => import('./pages/invoice-detail-page').then((m) => m.InvoiceDetailPage),
    title: 'Detalle de factura',
    canActivate: [authGuard, permissionGuard('facturacion.ver')],
  },
  {
    path: 'facturacion/:id/pago',
    loadComponent: () => import('./pages/register-payment-page').then((m) => m.RegisterPaymentPage),
    title: 'Registrar pago',
    canActivate: [authGuard, permissionGuard('facturacion.registrar-pago')],
  },
  // Clientes
  {
    path: 'clientes',
    loadComponent: () => import('./pages/customers-page').then((m) => m.CustomersPage),
    title: 'Clientes',
    canActivate: [authGuard, permissionGuard('clientes.ver')],
  },
  {
    path: 'clientes/:id',
    loadComponent: () => import('./pages/customer-detail-page').then((m) => m.CustomerDetailPage),
    title: 'Ficha de cliente',
    canActivate: [authGuard, permissionGuard('clientes.ver')],
  },
  {
    path: 'clientes/:id/editar',
    loadComponent: () => import('./pages/customer-edit-page').then((m) => m.CustomerEditPage),
    title: 'Editar cliente',
    canActivate: [authGuard, permissionGuard('clientes.editar')],
    canDeactivate: [unsavedChangesGuard],
  },
  // Inventario
  {
    path: 'inventario',
    loadComponent: () => import('./pages/products-page').then((m) => m.ProductsPage),
    title: 'Inventario',
    canActivate: [authGuard, permissionGuard('inventario.ver')],
  },
  {
    path: 'inventario/:id',
    loadComponent: () => import('./pages/product-detail-page').then((m) => m.ProductDetailPage),
    title: 'Detalle de producto',
    canActivate: [authGuard, permissionGuard('inventario.ver')],
  },
  {
    path: 'inventario/:id/ajuste',
    loadComponent: () => import('./pages/stock-adjust-page').then((m) => m.StockAdjustPage),
    title: 'Ajuste de stock',
    canActivate: [authGuard, permissionGuard('inventario.ajustar-stock')],
  },
  // Informes
  {
    path: 'informes',
    loadComponent: () => import('./pages/reports-page').then((m) => m.ReportsPage),
    title: 'Informes',
    canActivate: [authGuard, permissionGuard('informes.ver'), reportsEnabledGuard],
  },
  // Ajustes
  {
    path: 'ajustes/usuarios',
    loadComponent: () => import('./pages/users-roles-page').then((m) => m.UsersRolesPage),
    title: 'Usuarios y roles',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'ajustes/preferencias',
    loadComponent: () => import('./pages/preferences-page').then((m) => m.PreferencesPage),
    title: 'Preferencias',
    canActivate: [authGuard, permissionGuard('ajustes.preferencias')],
  },
  // Not found
  {
    path: '**',
    loadComponent: () => import('./pages/not-found-page').then((m) => m.NotFoundPage),
    title: 'No encontrado',
  },
];