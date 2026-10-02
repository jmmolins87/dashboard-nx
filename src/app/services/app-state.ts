import { Service } from '@angular/core';
import { signal, computed, effect, inject } from '@angular/core';
import { MockData } from './mock-data';
import {
  Order,
  OrderFilters,
  OrderStatus,
  Invoice,
  InvoiceFilters,
  InvoiceStatus,
  Customer,
  CustomerFilters,
  CustomerSegment,
  CustomerStatus,
  Product,
  ProductFilters,
  ProductCategory,
  ProductStatus,
  User,
  RoleId,
  AppUser,
  AppPreferences,
  Notification,
  ToastMessage,
  StockMovement,
  SearchResult,
  SearchCategory,
} from '../models';

@Service()
export class AppState {
  private readonly mockData = inject(MockData);

  // Estado global
  readonly bootstrapped = signal(false);

  // Temas y preferencias
  readonly preferencias = signal<AppPreferences>({
    tema: 'claro',
    densidad: 'comoda',
    moneda: 'EUR',
    formatoFecha: 'corto',
    idioma: 'es',
    informesHabilitados: true,
    notificacionesEmail: true,
    notificacionesPush: false,
    autoGuardar: true,
  });

  // Sesión
  readonly usuarioActual = signal<AppUser | null>(null);

  // Pedidos
  readonly pedidos = signal<Order[]>([]);
  readonly filtrosPedidos = signal<OrderFilters>({
    texto: '',
    estado: 'todos',
    clienteId: null,
    soloPendientes: false,
  });
  readonly pedidoSeleccionadoId = signal<string | null>(null);
  readonly cargandoPedidos = signal(false);

  // Facturación
  readonly facturas = signal<Invoice[]>([]);
  readonly filtrosFacturas = signal<InvoiceFilters>({
    texto: '',
    estado: 'todos',
    clienteId: null,
    soloPendientes: false,
  });
  readonly facturaSeleccionadaId = signal<string | null>(null);
  readonly cargandoFacturas = signal(false);

  // Clientes
  readonly clientes = signal<Customer[]>([]);
  readonly filtrosClientes = signal<CustomerFilters>({
    texto: '',
    segmento: 'todos',
    estado: 'todos',
    soloConDeuda: false,
  });
  readonly clienteSeleccionadoId = signal<string | null>(null);
  readonly cargandoClientes = signal(false);

  // Inventario
  readonly productos = signal<Product[]>([]);
  readonly filtrosProductos = signal<ProductFilters>({
    texto: '',
    categoria: 'todas',
    soloBajoStock: false,
  });
  readonly productoSeleccionadoId = signal<string | null>(null);
  readonly cargandoProductos = signal(false);
  readonly movimientosStock = signal<StockMovement[]>([]);

  // Usuarios
  readonly usuarios = signal<User[]>([]);
  readonly cargandoUsuarios = signal(false);

  // Notificaciones
  readonly notificaciones = signal<Notification[]>([]);
  readonly toasts = signal<ToastMessage[]>([]);

  // Computeds de pedidos
  readonly pedidosFiltrados = computed(() => {
    const f = this.filtrosPedidos();
    let lista = this.pedidos();
    if (f.texto) {
      const t = f.texto.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.numero.toLowerCase().includes(t) ||
          p.clienteId.toLowerCase().includes(t) ||
          p.notas.toLowerCase().includes(t)
      );
    }
    if (f.estado !== 'todos') lista = lista.filter((p) => p.estado === f.estado);
    if (f.clienteId) lista = lista.filter((p) => p.clienteId === f.clienteId);
    if (f.soloPendientes) lista = lista.filter((p) => !['entregado', 'cancelado'].includes(p.estado));
    return lista;
  });

  readonly pedidosPendientesCount = computed(() =>
    this.pedidos().filter((p) => !['entregado', 'cancelado'].includes(p.estado)).length
  );

  readonly pedidosPorEstado = computed(() => {
    const estados: OrderStatus[] = ['borrador', 'confirmado', 'preparacion', 'enviado', 'entregado', 'cancelado'];
    const mapa = new Map<OrderStatus, number>();
    for (const e of estados) mapa.set(e, 0);
    for (const p of this.pedidos()) mapa.set(p.estado, (mapa.get(p.estado) ?? 0) + 1);
    return mapa;
  });

  // Computeds de facturación
  readonly facturasFiltradas = computed(() => {
    const f = this.filtrosFacturas();
    let lista = this.facturas();
    if (f.texto) {
      const t = f.texto.toLowerCase();
      lista = lista.filter((i) => i.numero.toLowerCase().includes(t) || i.clienteId.toLowerCase().includes(t));
    }
    if (f.estado !== 'todos') lista = lista.filter((i) => i.estado === f.estado);
    if (f.clienteId) lista = lista.filter((i) => i.clienteId === f.clienteId);
    if (f.soloPendientes) lista = lista.filter((i) => i.total > i.pagado);
    return lista;
  });

  readonly facturasPendientesTotal = computed(() =>
    this.facturas().reduce((s, f) => s + Math.max(0, f.total - f.pagado), 0)
  );

  readonly facturasVencidas = computed(() => {
    const ahora = new Date().toISOString();
    return this.facturas().filter((f) => f.estado === 'emitida' && f.fechaVencimiento < ahora);
  });

  // Computeds de clientes
  readonly clientesFiltrados = computed(() => {
    const f = this.filtrosClientes();
    let lista = this.clientes();
    if (f.texto) {
      const t = f.texto.toLowerCase();
      lista = lista.filter(
        (c) =>
          c.nombre.toLowerCase().includes(t) ||
          c.codigo.toLowerCase().includes(t) ||
          c.email.toLowerCase().includes(t) ||
          c.cif.toLowerCase().includes(t)
      );
    }
    if (f.segmento !== 'todos') lista = lista.filter((c) => c.segmento === f.segmento);
    if (f.estado !== 'todos') lista = lista.filter((c) => c.estado === f.estado);
    if (f.soloConDeuda) {
      const conDeuda = new Set(this.facturas().filter((i) => i.total > i.pagado).map((i) => i.clienteId));
      lista = lista.filter((c) => conDeuda.has(c.id));
    }
    return lista;
  });

  readonly clientesPorSegmento = computed(() => {
    const mapa = new Map<CustomerSegment, number>();
    for (const c of this.clientes()) mapa.set(c.segmento, (mapa.get(c.segmento) ?? 0) + 1);
    return mapa;
  });

  // Computeds de inventario
  readonly productosFiltrados = computed(() => {
    const f = this.filtrosProductos();
    let lista = this.productos();
    if (f.texto) {
      const t = f.texto.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(t) ||
          p.sku.toLowerCase().includes(t) ||
          p.descripcion.toLowerCase().includes(t)
      );
    }
    if (f.categoria !== 'todas') lista = lista.filter((p) => p.categoria === f.categoria);
    if (f.soloBajoStock) lista = lista.filter((p) => p.stock <= p.stockMinimo);
    return lista;
  });

  readonly productosBajoStock = computed(() =>
    this.productos().filter((p) => p.stock <= p.stockMinimo)
  );

  readonly productosSinStock = computed(() =>
    this.productos().filter((p) => p.stock === 0)
  );

  readonly stockPorCategoria = computed(() => {
    const mapa = new Map<ProductCategory, number>();
    for (const p of this.productos()) {
      const cat = p.categoria;
      mapa.set(cat, (mapa.get(cat) ?? 0) + p.stock);
    }
    return mapa;
  });

  // Computeds usuarios
  readonly usuariosPorRol = computed(() => {
    const mapa = new Map<RoleId, number>();
    for (const u of this.usuarios()) mapa.set(u.rol as RoleId, (mapa.get(u.rol) ?? 0) + 1);
    return mapa;
  });

  // Notificaciones
  readonly notificacionesNoLeidas = computed(() =>
    this.notificaciones().filter((n) => !n.leida).length
  );

  // Inicialización
  bootstrap(): void {
    if (this.bootstrapped()) return;
    this.mockData.seed(this);
    this.bootstrapped.set(true);
  }

  // Helpers de mutación
  setPedidos(pedidos: Order[]): void {
    this.pedidos.set(pedidos);
  }

  actualizarPedido(pedido: Order): void {
    this.pedidos.update((lista) => lista.map((p) => (p.id === pedido.id ? pedido : p)));
  }

  setFacturas(facturas: Invoice[]): void {
    this.facturas.set(facturas);
  }

  actualizarFactura(factura: Invoice): void {
    this.facturas.update((lista) => lista.map((f) => (f.id === factura.id ? factura : f)));
  }

  setClientes(clientes: Customer[]): void {
    this.clientes.set(clientes);
  }

  actualizarCliente(cliente: Customer): void {
    this.clientes.update((lista) => lista.map((c) => (c.id === cliente.id ? cliente : c)));
  }

  setProductos(productos: Product[]): void {
    this.productos.set(productos);
  }

  actualizarProducto(producto: Product): void {
    this.productos.update((lista) => lista.map((p) => (p.id === producto.id ? producto : p)));
  }

  agregarMovimientoStock(mov: StockMovement): void {
    this.movimientosStock.update((lista) => [mov, ...lista].slice(0, 500));
  }

  setUsuarios(usuarios: User[]): void {
    this.usuarios.set(usuarios);
  }

  agregarToast(toast: ToastMessage): void {
    this.toasts.update((lista) => [toast, ...lista].slice(0, 20));
  }

  removerToast(id: string): void {
    this.toasts.update((lista) => lista.filter((t) => t.id !== id));
  }

  agregarNotificacion(notif: Notification): void {
    this.notificaciones.update((lista) => [notif, ...lista].slice(0, 100));
  }

  marcarNotificacionLeida(id: string): void {
    this.notificaciones.update((lista) =>
      lista.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  }

  actualizarPreferencias(parcial: Partial<AppPreferences>): void {
    this.preferencias.update((p) => ({ ...p, ...parcial }));
  }

  setUsuarioActual(usuario: AppUser | null): void {
    this.usuarioActual.set(usuario);
  }
}