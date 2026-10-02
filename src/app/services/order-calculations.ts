import { Service } from '@angular/core';
import { Order, OrderItem } from '../models/order.model';

@Service()
export class OrderCalculations {
  subtotal(pedido: Order): number {
    return pedido.items.reduce((s, i) => s + i.cantidad * i.precioUnitario * (1 - i.descuento / 100), 0);
  }

  descuentoTotal(pedido: Order): number {
    return pedido.items.reduce((s, i) => s + i.cantidad * i.precioUnitario * (i.descuento / 100), 0);
  }

  baseImponible(pedido: Order): number {
    return this.subtotal(pedido) * (1 - pedido.descuento / 100);
  }

  iva(pedido: Order): number {
    return Math.round(this.baseImponible(pedido) * 0.21 * 100) / 100;
  }

  gastosEnvio(pedido: Order): number {
    return pedido.gastosEnvio;
  }

  total(pedido: Order): number {
    return Math.round((this.baseImponible(pedido) + this.iva(pedido) + this.gastosEnvio(pedido)) * 100) / 100;
  }

  totales(pedido: Order): { subtotal: number; descuento: number; iva: number; total: number } {
    return {
      subtotal: this.subtotal(pedido),
      descuento: this.descuentoTotal(pedido) + this.subtotal(pedido) * (pedido.descuento / 100),
      iva: this.iva(pedido),
      total: this.total(pedido),
    };
  }

  lineaTotal(item: OrderItem): number {
    return Math.round(item.cantidad * item.precioUnitario * (1 - item.descuento / 100) * 100) / 100;
  }
}