import { Service } from '@angular/core';
import { signal } from '@angular/core';
import { SEMILLA_FIJA, MOCK_NOW, mulberry32, entero, elegir, ponderar, Rng } from '../utils/seed.utils';
import { AppState } from './app-state';
import {
  Order,
  OrderStatus,
  OrderItem,
  OrderPriority,
  Invoice,
  InvoiceStatus,
  InvoiceLine,
  Customer,
  CustomerSegment,
  CustomerStatus,
  CustomerAddress,
  Product,
  ProductCategory,
  ProductStatus,
  User,
  RoleId,
  AppUser,
  StockMovement,
  MovementType,
  SearchResult,
  SearchCategory,
  Notification,
  ToastMessage,
  ToastType,
} from '../models';

@Service()
export class MockData {
  private readonly rng: Rng = mulberry32(SEMILLA_FIJA);

  // Pools de datos realistas
  private readonly nombres = [
    'María', 'José', 'Antonio', 'Carmen', 'Francisco', 'Ana', 'Luis', 'Isabel', 'Juan', 'Pilar',
    'Carlos', 'Laura', 'Manuel', 'Rosa', 'Javier', 'Mercedes', 'Daniel', 'Dolores', 'Miguel', 'Teresa',
  ];
  private readonly apellidos = [
    'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín',
    'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro',
  ];
  private readonly empresas = [
    'Construcciones Ibéricas SL', 'ElectroMadrid SA', 'Fontanería Norte SLU', 'Pinturas Hermanos García',
    'Herramientas Industriales S.A.', 'Jardines del Sur SL', 'Suministros Técnicos Levante',
    'Ferretería La Llave', 'Cableados y Redes SL', 'Climatización Central',
  ];
  private readonly ciudades = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'];
  private readonly provincias = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Balears', 'Las Palmas', 'Bizkaia'];
  private readonly calles = ['C/ Mayor', 'Av. Diagonal', 'C/ Gran Vía', 'Pz. España', 'C/ Alcalá', 'Av. América', 'C/ Serrano', 'Pz. Castilla', 'C/ Princesa', 'Av. Cataluña'];
  private readonly productosBase = [
    { nombre: 'Taladro percutor 800W', categoria: 'herramientas' as ProductCategory, precio: 89.9, coste: 45, proveedor: 'Bosch' },
    { nombre: 'Caja de herramientas 108 pzs', categoria: 'herramientas', precio: 125, coste: 68, proveedor: 'Stanley' },
    { nombre: 'Cable eléctrico 2.5mm 100m', categoria: 'electricidad', precio: 67.5, coste: 32, proveedor: 'Prysmian' },
    { nombre: 'Interruptor diferencial 40A', categoria: 'electricidad', precio: 28.9, coste: 14, proveedor: 'Schneider' },
    { nombre: 'Tubo PVC 40mm 3m', categoria: 'fontaneria', precio: 12.4, coste: 5.2, proveedor: 'Wavin' },
    { nombre: 'Grifo monomando cocina', categoria: 'fontaneria', precio: 45.9, coste: 22, proveedor: 'Roca' },
    { nombre: 'Pintura plástica blanca 15L', categoria: 'pintura', precio: 58.9, coste: 28, proveedor: 'Titan' },
    { nombre: 'Rodillo microfibra 18cm', categoria: 'pintura', precio: 4.95, coste: 1.8, proveedor: 'Purdy' },
    { nombre: 'Sierra circular 185mm', categoria: 'herramientas', precio: 145, coste: 78, proveedor: 'Makita' },
    { nombre: 'Multímetro digital TRMS', categoria: 'electricidad', precio: 42.9, coste: 19, proveedor: 'Fluke' },
    { nombre: 'Llave inglesa 12"', categoria: 'ferreteria', precio: 18.5, coste: 8, proveedor: 'Bahco' },
    { nombre: 'Cinta métrica 5m', categoria: 'ferreteria', precio: 6.95, coste: 2.8, proveedor: 'Stanley' },
    { nombre: 'Bomba de achique 12V', categoria: 'jardineria', precio: 38.9, coste: 16, proveedor: 'Grundfos' },
    { nombre: 'Manguera jardín 25m', categoria: 'jardineria', precio: 24.9, coste: 11, proveedor: 'Hozelock' },
    { nombre: 'Pintura anticorrosiva rojo 4L', categoria: 'pintura', precio: 35.9, coste: 16, proveedor: 'Hempel' },
    { nombre: 'Caja de derivación estanca', categoria: 'electricidad', precio: 8.45, coste: 3.5, proveedor: 'Simon' },
    { nombre: 'Racor PVC tee 40mm', categoria: 'fontaneria', precio: 2.35, coste: 0.9, proveedor: 'Wavin' },
    { nombre: 'Destornillador Phillips PH2', categoria: 'ferreteria', precio: 3.95, coste: 1.4, proveedor: 'Wera' },
    { nombre: 'Disco diamantado 115mm', categoria: 'herramientas', precio: 22.9, coste: 9.5, proveedor: 'Norton' },
    { nombre: 'Regleta 6 tomas con interruptor', categoria: 'electricidad', precio: 9.99, coste: 4.2, proveedor: 'Brennenstuhl' },
    { nombre: 'Silicona sanitaria 300ml', categoria: 'pintura', precio: 7.8, coste: 3.1, proveedor: 'Soudal' },
    { nombre: 'Pala de punta redonda', categoria: 'jardineria', precio: 16.9, coste: 7.5, proveedor: 'Bellota' },
    { nombre: 'Nivel láser autonivelante', categoria: 'herramientas', precio: 189, coste: 98, proveedor: 'Leica' },
    { nombre: 'Cable coaxial 100m', categoria: 'electricidad', precio: 34.9, coste: 15, proveedor: 'Televes' },
    { nombre: 'Válvula de bola 1/2"', categoria: 'fontaneria', precio: 6.75, coste: 2.8, proveedor: 'Itap' },
    { nombre: 'Broca para hormigón 10mm', categoria: 'herramientas', precio: 4.5, coste: 1.8, proveedor: 'Bosch' },
    { nombre: 'Pintura pizarra negra 1L', categoria: 'pintura', precio: 14.9, coste: 6.5, proveedor: 'Rust-Oleum' },
    { nombre: 'Tijera de podar bypass', categoria: 'jardineria', precio: 19.9, coste: 8.5, proveedor: 'Felco' },
    { nombre: 'Cinta aislante 19mmx20m', categoria: 'electricidad', precio: 1.45, coste: 0.45, proveedor: '3M' },
    { nombre: 'Abrazadera de nylon 100uds', categoria: 'ferreteria', precio: 8.9, coste: 3.5, proveedor: 'HellermannTyton' },
    { nombre: 'Lámina policarbonato 2mm', categoria: 'ferreteria', precio: 42.5, coste: 21, proveedor: 'Makrolon' },
    { nombre: 'Foco LED 50W IP65', categoria: 'electricidad', precio: 28.9, coste: 13, proveedor: 'Philips' },
    { nombre: 'Desatascador manual', categoria: 'fontaneria', precio: 5.95, coste: 2.2, proveedor: 'Rothenberger' },
    { nombre: 'Pincel plano 50mm', categoria: 'pintura', precio: 3.8, coste: 1.3, proveedor: 'Proarte' },
    { nombre: 'Martillo carpintero 500g', categoria: 'ferreteria', precio: 14.9, coste: 6.5, proveedor: 'Stanley' },
    { nombre: 'Generador inverter 2kW', categoria: 'herramientas', precio: 589, coste: 320, proveedor: 'Honda' },
    { nombre: 'Aspiradora industrial 30L', categoria: 'herramientas', precio: 169, coste: 89, proveedor: 'Kärcher' },
    { nombre: 'Escalera telescópica 3.8m', categoria: 'ferreteria', precio: 119, coste: 58, proveedor: 'Alfa' },
    { nombre: 'Compresor 50L 2CV', categoria: 'herramientas', precio: 245, coste: 135, proveedor: 'Abac' },
    { nombre: 'Soldador inverter 160A', categoria: 'electricidad', precio: 125, coste: 62, proveedor: 'Telwin' },
    { nombre: 'Detector de tensión', categoria: 'electricidad', precio: 12.9, coste: 5.2, proveedor: 'Knipex' },
    { nombre: 'Cizalla para chapa', categoria: 'ferreteria', precio: 22.9, coste: 10, proveedor: 'Bahco' },
    { nombre: 'Pistola de silicona', categoria: 'pintura', precio: 8.45, coste: 3.4, proveedor: 'Cox' },
    { nombre: 'Rastrillo de jardín 14d', categoria: 'jardineria', precio: 9.95, coste: 4.1, proveedor: 'Bellota' },
    { nombre: 'Maceta plástica 30cm', categoria: 'jardineria', precio: 4.5, coste: 1.7, proveedor: 'Elho' },
    { nombre: 'Fertilizante universal 5kg', categoria: 'jardineria', precio: 16.9, coste: 7.5, proveedor: 'Compo' },
  ];

  seed(state: AppState): void {
    const clientes = this.generarClientes(26);
    const productos = this.generarProductos(40);
    const pedidos = this.generarPedidos(140, clientes, productos);
    const facturas = this.generarFacturas(pedidos);
    const usuarios = this.generarUsuarios(8);
    const movimientosStock = this.generarMovimientosStock(productos, pedidos, facturas);
    const notificaciones = this.generarNotificaciones(pedidos, facturas, clientes);

    state.setClientes(clientes);
    state.setProductos(productos);
    state.setPedidos(pedidos);
    state.setFacturas(facturas);
    state.setUsuarios(usuarios);
    for (const m of movimientosStock) state.agregarMovimientoStock(m);
    for (const n of notificaciones) state.agregarNotificacion(n);

    // Usuario admin por defecto
    const admin = usuarios.find((u) => u.rol === 'admin')!;
    state.setUsuarioActual({
      id: admin.id,
      nombreCompleto: admin.nombre,
      email: admin.email,
      rol: admin.rol,
      iniciales: admin.nombre.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
      ultimoAcceso: new Date().toISOString(),
      preferencias: { tema: 'claro', densidad: 'comoda', moneda: 'EUR', notificacionesEmail: true },
    });
  }

  private generarClientes(n: number): Customer[] {
    const segmentos: CustomerSegment[] = ['vip', 'mayorista', 'minorista', 'nuevo'];
    const estados: CustomerStatus[] = ['activo', 'inactivo', 'moroso', 'bloqueado'];
    const resultado: Customer[] = [];
    for (let i = 1; i <= n; i++) {
      const nombre = `${elegir(this.rng, this.nombres)} ${elegir(this.rng, this.apellidos)} ${elegir(this.rng, this.apellidos)}`;
      const segmento = ponderar(this.rng, [['vip', 10], ['mayorista', 20], ['minorista', 50], ['nuevo', 20]]);
      const estado = ponderar(this.rng, [['activo', 70], ['inactivo', 15], ['moroso', 10], ['bloqueado', 5]]);
      const direccion: CustomerAddress = {
        calle: `${elegir(this.rng, this.calles)} ${entero(this.rng, 1, 120)}`,
        ciudad: elegir(this.rng, this.ciudades),
        provincia: elegir(this.rng, this.provincias),
        cp: `${entero(this.rng, 1000, 52999).toString().padStart(5, '0')}`,
        pais: 'ES',
      };
      const cif = this.generarCif();
      resultado.push({
        id: `CLI-${String(i).padStart(4, '0')}`,
        codigo: `C-${String(i).padStart(4, '0')}`,
        nombre,
        razonSocial: `${nombre} ${elegir(this.rng, ['SL', 'SA', 'SLU', 'S.Coop'])}`,
        cif,
        email: this.generarEmail(nombre, i),
        telefono: this.generarTelefono(),
        segmento,
        estado,
        direccion,
        limiteCredito: segmento === 'vip' ? entero(this.rng, 50000, 200000) : segmento === 'mayorista' ? entero(this.rng, 15000, 60000) : segmento === 'minorista' ? entero(this.rng, 3000, 15000) : entero(this.rng, 1000, 5000),
        iban: this.generarIban(),
        alta: this.fechaAleatoriaHace(365, 1800),
        contacto: nombre.split(' ')[0],
      });
    }
    return resultado;
  }

  private generarProductos(n: number): Product[] {
    const categorias: ProductCategory[] = ['ferreteria', 'electricidad', 'fontaneria', 'pintura', 'herramientas', 'jardineria'];
    const estados: ProductStatus[] = ['activo', 'descatalogado', 'sin-stock'];
    const base = [...this.productosBase];
    const resultado: Product[] = [];
    for (let i = 0; i < n; i++) {
      const baseProd = i < base.length ? base[i] : elegir(this.rng, base);
      const categoria = baseProd.categoria as ProductCategory;
      const stock = entero(this.rng, 0, 200);
      const stockMin = categoria === 'herramientas' ? entero(this.rng, 3, 10) : entero(this.rng, 5, 20);
      const estado: ProductStatus = stock === 0 ? 'sin-stock' : stock < stockMin ? 'activo' : elegir(this.rng, ['activo', 'activo', 'activo', 'descatalogado']);
      resultado.push({
        id: `PRD-${String(i + 1).padStart(4, '0')}`,
        sku: `SKU-${String(i + 1).padStart(4, '0')}`,
        nombre: baseProd.nombre,
        descripcion: `${baseProd.nombre} - ${elegir(this.rng, ['Profesional', 'Industrial', 'Doméstico', 'Premium'])}`,
        categoria,
        precio: Math.round(baseProd.precio * (0.9 + this.rng() * 0.3) * 100) / 100,
        coste: Math.round(baseProd.coste * (0.85 + this.rng() * 0.25) * 100) / 100,
        stock,
        stockMinimo: stockMin,
        estado,
        proveedor: baseProd.proveedor,
        ubicacion: `A-${entero(this.rng, 1, 12)}-${entero(this.rng, 1, 20)}`,
      });
    }
    return resultado;
  }

  private generarPedidos(n: number, clientes: Customer[], productos: Product[]): Order[] {
    const estados: OrderStatus[] = ['borrador', 'confirmado', 'preparacion', 'enviado', 'entregado', 'cancelado'];
    const prioridades: OrderPriority[] = ['baja', 'media', 'alta'];
    const activos = clientes.filter((c) => c.estado === 'activo');
    const productosActivos = productos.filter((p) => p.estado === 'activo');
    const resultado: Order[] = [];
    for (let i = 1; i <= n; i++) {
      const cliente = elegir(this.rng, activos);
      const numItems = entero(this.rng, 1, 6);
      const itemsSeleccionados = Array.from({ length: numItems }, () => elegir(this.rng, productosActivos));
      const items: OrderItem[] = itemsSeleccionados.map((p, idx) => ({
        productoId: p.id,
        descripcion: p.nombre,
        cantidad: entero(this.rng, 1, 10),
        precioUnitario: p.precio,
        descuento: elegir(this.rng, [0, 0, 0, 2.5, 5, 7.5, 10]),
      }));
      const estado = ponderar(this.rng, [
        ['borrador', 5],
        ['confirmado', 15],
        ['preparacion', 20],
        ['enviado', 20],
        ['entregado', 30],
        ['cancelado', 10],
      ]);
      const fecha = this.fechaAleatoriaHace(180, 30);
      const fechaEntrega = new Date(fecha);
      fechaEntrega.setUTCDate(fechaEntrega.getUTCDate() + entero(this.rng, 1, 14));
      resultado.push({
        id: `PED-${String(i).padStart(5, '0')}`,
        numero: `PED-2026-${String(i).padStart(4, '0')}`,
        clienteId: cliente.id,
        fecha,
        fechaEntregaEstimada: fechaEntrega.toISOString(),
        estado,
        prioridad: ponderar(this.rng, [['baja', 30], ['media', 50], ['alta', 20]]),
        items,
        descuento: elegir(this.rng, [0, 0, 0, 5, 10]),
        gastosEnvio: estado === 'entregado' || estado === 'enviado' ? Math.round((5 + this.rng() * 15) * 100) / 100 : 0,
        notas: elegir(this.rng, ['', '', 'Cliente urgente', 'Entregar en horario comercial', 'Requiere factura simplificada', 'Llamar antes de entregar']),
        creadoPor: elegir(this.rng, ['admin', 'gestor', 'comercial']),
      });
    }
    return resultado;
  }

  private generarFacturas(pedidos: Order[]): Invoice[] {
    const facturables = pedidos.filter((p) => !['borrador', 'cancelado'].includes(p.estado));
    const resultado: Invoice[] = [];
    let n = 0;
    for (const pedido of facturables) {
      if (this.rng() > 0.15) continue; // 85% facturan
      n++;
      const lineas: InvoiceLine[] = pedido.items.map((item) => ({
        pedidoId: pedido.id,
        productoId: item.productoId,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        descuento: item.descuento,
      }));
      const base = lineas.reduce((s, l) => s + l.cantidad * l.precioUnitario * (1 - l.descuento / 100), 0);
      const iva = Math.round(base * 0.21 * 100) / 100;
      const total = Math.round((base + iva + pedido.gastosEnvio) * 100) / 100;
      const estado = this.rng() < 0.15 ? 'anulada' : this.rng() < 0.3 ? 'emitida' : this.rng() < 0.65 ? 'pagada' : 'vencida';
      const fechaEmision = this.sumarDias(pedido.fecha, entero(this.rng, 0, 5));
      const fechaVencimiento = this.sumarDias(fechaEmision, entero(this.rng, 30, 60));
      let pagado = 0;
      if (estado === 'pagada') pagado = total;
      else if (estado === 'vencida') pagado = Math.round(total * this.rng() * 0.4 * 100) / 100;
      resultado.push({
        id: `FAC-${String(n).padStart(5, '0')}`,
        numero: `FAC-2026-${String(n).padStart(4, '0')}`,
        pedidoId: pedido.id,
        clienteId: pedido.clienteId,
        fechaEmision,
        fechaVencimiento,
        estado,
        lineas,
        base: Math.round(base * 100) / 100,
        iva,
        total,
        pagado,
        notas: '',
      });
    }
    return resultado;
  }

  private generarUsuarios(n: number): User[] {
    const roles: RoleId[] = ['admin', 'gestor', 'comercial', 'operario', 'consulta'];
    const resultado: User[] = [];
    // Asegurar al menos un admin
    resultado.push({
      id: 'USR-0001',
      nombre: 'Administrador Principal',
      email: 'admin@acme.es',
      rol: 'admin',
      estado: 'activo',
      ultimoAcceso: new Date(MOCK_NOW - 3600000).toISOString(),
      avatar: undefined,
    });
    for (let i = 2; i <= n; i++) {
      const nombre = `${elegir(this.rng, this.nombres)} ${elegir(this.rng, this.apellidos)}`;
      resultado.push({
        id: `USR-${String(i).padStart(4, '0')}`,
        nombre,
        email: this.generarEmail(nombre, i + 100),
        rol: elegir(this.rng, roles.slice(1)), // no más admins
        estado: ponderar(this.rng, [['activo', 85], ['inactivo', 10], ['bloqueado', 5]]),
        ultimoAcceso: new Date(MOCK_NOW - entero(this.rng, 0, 7 * 86400000)).toISOString(),
      });
    }
    return resultado;
  }

  private generarMovimientosStock(productos: Product[], pedidos: Order[], facturas: Invoice[]): StockMovement[] {
    const resultado: StockMovement[] = [];
    let id = 1;
    // Entradas iniciales
    for (const p of productos) {
      if (p.stock > 0) {
        resultado.push({
          id: `MOV-${String(id++).padStart(5, '0')}`,
          productoId: p.id,
          tipo: 'entrada',
          cantidad: p.stock,
          motivo: 'Stock inicial',
          referencia: 'INICIAL',
          fecha: this.fechaAleatoriaHace(365, 180),
          usuario: 'sistema',
        });
      }
    }
    // Salidas por pedidos entregados
    for (const pedido of pedidos) {
      if (pedido.estado !== 'entregado') continue;
      for (const item of pedido.items) {
        resultado.push({
          id: `MOV-${String(id++).padStart(5, '0')}`,
          productoId: item.productoId,
          tipo: 'salida',
          cantidad: item.cantidad,
          motivo: `Entrega pedido ${pedido.numero}`,
          referencia: pedido.id,
          fecha: this.sumarDias(pedido.fecha, entero(this.rng, 0, 10)),
          usuario: pedido.creadoPor,
        });
      }
    }
    // Ajustes aleatorios
    for (let i = 0; i < 25; i++) {
      const p = elegir(this.rng, productos);
      const tipo: MovementType = ponderar(this.rng, [['ajuste', 60], ['devolucion', 40]]);
      const cantidad = tipo === 'devolucion' ? entero(this.rng, 1, 5) : entero(this.rng, -10, 10);
      resultado.push({
        id: `MOV-${String(id++).padStart(5, '0')}`,
        productoId: p.id,
        tipo,
        cantidad: Math.abs(cantidad),
        motivo: tipo === 'devolucion' ? 'Devolución cliente' : 'Ajuste inventario',
        referencia: `AJU-${String(i).padStart(4, '0')}`,
        fecha: this.fechaAleatoriaHace(180, 10),
        usuario: 'operario',
      });
    }
    return resultado;
  }

  private generarNotificaciones(pedidos: Order[], facturas: Invoice[], clientes: Customer[]): Notification[] {
    const resultado: Notification[] = [];
    // Notificaciones de sistema
    resultado.push({
      id: 'NOT-0001',
      tipo: 'sistema',
      titulo: 'Bienvenido al panel Acme ERP',
      detalle: 'Este es tu panel de control. Explora las secciones del menú lateral.',
      leida: false,
      fecha: new Date(MOCK_NOW - 86400000).toISOString(),
    });
    // Pedidos recientes
    for (const p of pedidos.slice(0, 3)) {
      resultado.push({
        id: `NOT-${String(resultado.length + 1).padStart(4, '0')}`,
        tipo: 'pedido',
        titulo: `Pedido ${p.numero} ${p.estado}`,
        detalle: `Cliente: ${this.clienteNombre(p.clienteId, clientes)}`,
        leida: this.rng() < 0.7,
        fecha: p.fecha,
        enlace: `/pedidos/${p.id}`,
      });
    }
    // Facturas pendientes
    for (const f of facturas.filter((f) => f.estado === 'emitida' || f.estado === 'vencida').slice(0, 3)) {
      resultado.push({
        id: `NOT-${String(resultado.length + 1).padStart(4, '0')}`,
        tipo: 'factura',
        titulo: `Factura ${f.numero} ${f.estado}`,
        detalle: `Importe pendiente: ${Math.max(0, f.total - f.pagado).toFixed(2)} €`,
        leida: this.rng() < 0.5,
        fecha: f.fechaEmision,
        enlace: `/facturacion/${f.id}`,
      });
    }
    // Stock bajo
    for (const p of facturas.slice(0, 2)) {
      resultado.push({
        id: `NOT-${String(resultado.length + 1).padStart(4, '0')}`,
        tipo: 'stock',
        titulo: 'Stock bajo detectado',
        detalle: 'Revisar productos con stock por debajo del mínimo',
        leida: true,
        fecha: new Date(MOCK_NOW - entero(this.rng, 1, 5) * 86400000).toISOString(),
        enlace: '/inventario',
      });
    }
    return resultado;
  }

  private clienteNombre(id: string, clientes: Customer[]): string {
    return clientes.find((c) => c.id === id)?.nombre ?? id;
  }

  private generarCif(): string {
    const letra = elegir(this.rng, 'ABCDEFGHJKLMNPQRSUVW'.split(''));
    const nums = String(entero(this.rng, 1000000, 9999999)).padStart(7, '0');
    const control = elegir(this.rng, '0123456789AJ'.split(''));
    return `${letra}${nums}${control}`;
  }

  private generarIban(): string {
    return `ES${entero(this.rng, 10, 99)}${String(entero(this.rng, 0, 99999999999999999999)).padStart(20, '0')}`;
  }

  private generarEmail(nombre: string, idx: number): string {
    const base = nombre.toLowerCase().replace(/[^a-z]/g, '.').replace(/\.+/g, '.');
    return `${base}${idx}@${elegir(this.rng, ['empresa', 'correo', 'negocio'])}.es`;
  }

  private generarTelefono(): string {
    return `+34 ${elegir(this.rng, [6, 7, 9])}${String(entero(this.rng, 10000000, 99999999))}`;
  }

  private fechaAleatoriaHace(maxDias: number, minDias = 0): string {
    const dias = entero(this.rng, minDias, maxDias);
    return new Date(MOCK_NOW - dias * 86400000).toISOString();
  }

  private sumarDias(iso: string, dias: number): string {
    const d = new Date(iso);
    d.setUTCDate(d.getUTCDate() + dias);
    return d.toISOString();
  }
}