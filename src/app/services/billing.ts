import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { OrderCalculations } from './order-calculations';
import { Orders } from './orders';
import { CustomerService } from './customers';
import { Payments } from './payments';
import { Injector } from '@angular/core';
import { Invoice, InvoiceStatus, InvoiceLine, InvoiceFilters } from '../models/invoice.model';
import { Order, OrderStatus } from '../models/order.model';

@Service()
export class Billing {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly calc = inject(OrderCalculations);
  private readonly injector = inject(Injector);
  private ordersSvc?: Orders;
  private customersSvc?: CustomerService;
  private paymentsSvc?: Payments;

  private get orders(): Orders {
    this.ordersSvc ??= this.injector.get(Orders);
    return this.ordersSvc;
  }

  private get customers(): CustomerService {
    this.customersSvc ??= this.injector.get(CustomerService);
    return this.customersSvc;
  }

  private get payments(): Payments {
    this.paymentsSvc ??= this.injector.get(Payments);
    return this.paymentsSvc;
  }

  readonly cargando = computed(() => this.state.cargandoFacturas());

  readonly lista = computed(() => this.state.facturasFiltradas());
  readonly pendientesTotal = computed(() => this.state.facturasPendientesTotal());
  readonly vencidas = computed(() => this.state.facturasVencidas());

  actualizarFiltros(parcial: Partial<InvoiceFilters>): void {
    this.state.filtrosFacturas.update((f) => ({ ...f, ...parcial }));
  }

  facturaPorId(id: string): Invoice | undefined {
    return this.state.facturas().find((f) => f.id === id);
  }

  facturasFiltradasPorCliente(clienteId: string): Invoice[] {
    return this.state.facturas().filter((f) => f.clienteId === clienteId);
  }

  crearDesdePedido(pedidoId: string): Invoice | null {
    const pedido = this.orders.obtenerPedido(pedidoId);
    if (!pedido || ['borrador', 'cancelado'].includes(pedido.estado)) return null;
    const lineas: InvoiceLine[] = pedido.items.map((item) => ({
      pedidoId: pedido.id,
      productoId: item.productoId,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      descuento: item.descuento,
    }));
    const totales = this.calc.totales(pedido);
    const nueva: Invoice = {
      id: `FAC-NEW-${Date.now()}`,
      numero: `FAC-NEW`,
      pedidoId: pedido.id,
      clienteId: pedido.clienteId,
      fechaEmision: new Date().toISOString(),
      fechaVencimiento: new Date(Date.now() + 30 * 86400000).toISOString(),
      estado: 'borrador',
      lineas,
      base: totales.subtotal,
      iva: totales.iva,
      total: totales.total,
      pagado: 0,
      notas: `Generada desde pedido ${pedido.numero}`,
    };
    this.state.facturas.update((l) => [nueva, ...l]);
    this.eventBus.emit('invoice-created', { factura: nueva });
    return nueva;
  }

  cambiarEstado(id: string, estado: InvoiceStatus): void {
    const f = this.facturaPorId(id);
    if (!f) return;
    f.estado = estado;
    this.state.actualizarFactura(f);
  }

  registrarPago(facturaId: string, importe: number, metodo: 'transferencia' | 'tarjeta' | 'efectivo' | 'domiciliacion', referencia: string, notas: string): void {
    const f = this.facturaPorId(facturaId);
    if (!f) return;
    const pago = this.payments.registrar(facturaId, f.clienteId, importe, metodo, referencia, notas);
    f.pagado += importe;
    if (f.pagado >= f.total) f.estado = 'pagada';
    this.state.actualizarFactura(f);
    this.eventBus.emit('payment-registered', { pago, factura: f });
  }

  importePendiente(factura: Invoice): number {
    return Math.max(0, factura.total - factura.pagado);
  }
}