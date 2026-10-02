import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { OrderCalculations } from './order-calculations';
import { Injector } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Order, OrderStatus, OrderItem } from '../models/order.model';
import { Invoice } from '../models/invoice.model';

@Service()
export class Orders {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly calc = inject(OrderCalculations);
  private readonly injector = inject(Injector);
  private customersSvc?: CustomerService;

  private get customers(): CustomerService {
    this.customersSvc ??= this.injector.get(CustomerService);
    return this.customersSvc;
  }

  readonly cargando = computed(() => this.state.cargandoPedidos());

  readonly lista = computed(() => this.state.pedidosFiltrados());
  readonly pendientes = computed(() => this.state.pedidosPendientesCount());
  readonly porEstado = computed(() => this.state.pedidosPorEstado());

  obtenerPedido(id: string): Order | undefined {
    return this.state.pedidos().find((p) => p.id === id);
  }

  obtenerClienteNombre(clienteId: string): string {
    return this.customers.clienteNombre(clienteId);
  }

  actualizarFiltros(parcial: Partial<Order['estado'] & { texto?: string; clienteId?: string | null; soloPendientes?: boolean }>): void {
    this.state.filtrosPedidos.update((f) => ({ ...f, ...parcial }));
  }

  cambiarEstado(id: string, nuevoEstado: OrderStatus): void {
    const pedido = this.obtenerPedido(id);
    if (!pedido) return;
    const anterior = pedido.estado;
    pedido.estado = nuevoEstado;
    this.state.actualizarPedido(pedido);
    this.eventBus.emit('order-status-changed', { pedidoId: id, estadoAnterior: anterior, estado: nuevoEstado });
    this.eventBus.emit('order-updated', { pedido });
  }

  cancelarPedido(id: string, motivo: string): void {
    const pedido = this.obtenerPedido(id);
    if (!pedido) return;
    pedido.estado = 'cancelado';
    pedido.notas = motivo ? `${pedido.notas ? pedido.notas + ' | ' : ''}Cancelado: ${motivo}` : pedido.notas;
    this.state.actualizarPedido(pedido);
    this.eventBus.emit('order-cancelled', { pedido });
    this.eventBus.emit('order-updated', { pedido });
  }

  recalcularTotales(pedido: Order): { subtotal: number; descuento: number; iva: number; total: number } {
    return this.calc.totales(pedido);
  }

  crearBorrador(clienteId: string): Order {
    const nuevo: Order = {
      id: `PED-NEW-${Date.now()}`,
      numero: `PED-NEW`,
      clienteId,
      fecha: new Date().toISOString(),
      fechaEntregaEstimada: new Date(Date.now() + 7 * 86400000).toISOString(),
      estado: 'borrador',
      prioridad: 'media',
      items: [],
      descuento: 0,
      gastosEnvio: 0,
      notas: '',
      creadoPor: 'sistema',
    };
    this.state.pedidos.update((l) => [nuevo, ...l]);
    return nuevo;
  }

  añadirLinea(pedidoId: string, productoId: string, cantidad: number, precio: number, descuento = 0): void {
    const pedido = this.obtenerPedido(pedidoId);
    if (!pedido) return;
    pedido.items.push({ productoId, descripcion: '', cantidad, precioUnitario: precio, descuento });
    this.state.actualizarPedido(pedido);
  }

  eliminarLinea(pedidoId: string, idx: number): void {
    const pedido = this.obtenerPedido(pedidoId);
    if (!pedido) return;
    pedido.items.splice(idx, 1);
    this.state.actualizarPedido(pedido);
  }

  actualizarPedido(pedido: Order): void {
    this.state.actualizarPedido(pedido);
  }
}

import { CustomerService } from './customers';