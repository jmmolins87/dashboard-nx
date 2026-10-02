import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { Billing } from './billing';
import { Orders } from './orders';

@Service()
export class CustomerStats {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly billing = inject(Billing);
  private readonly orders = inject(Orders);
  private readonly trigger = signal(0);

  private bump() {
    this.trigger.update((n) => n + 1);
  }

  constructor() {
    this.eventBus.on().subscribe((e) => {
      if (e.tipo === 'payment-registered') this.bump();
    });
  }

  totalFacturado(clienteId: string): number {
    this.trigger();
    return this.billing
      .facturasFiltradasPorCliente(clienteId)
      .filter((f) => f.estado === 'pagada')
      .reduce((s, f) => s + f.total, 0);
  }

  pendienteCobro(clienteId: string): number {
    this.trigger();
    return this.billing
      .facturasFiltradasPorCliente(clienteId)
      .reduce((s, f) => s + Math.max(0, f.total - f.pagado), 0);
  }

  pedidosEntregados(clienteId: string): number {
    this.trigger();
    return this.orders.lista().filter((p) => p.clienteId === clienteId && p.estado === 'entregado').length;
  }

  ultimaCompra(clienteId: string): string | null {
    this.trigger();
    const facturas = this.billing
      .facturasFiltradasPorCliente(clienteId)
      .filter((f) => f.estado === 'pagada')
      .sort((a, b) => new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime());
    return facturas[0]?.fechaEmision ?? null;
  }

  rankingClientes(top = 10): { cliente: Customer; total: number; pedidos: number }[] {
    this.trigger();
    const clientes = this.state.clientes();
    return clientes
      .map((c) => ({
        cliente: c,
        total: this.totalFacturado(c.id),
        pedidos: this.pedidosEntregados(c.id),
      }))
      .filter((r) => r.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, top);
  }
}

import { Customer } from '../models/customer.model';