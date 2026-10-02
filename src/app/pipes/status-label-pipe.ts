import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_STATUS_LABELS, INVOICE_STATUS_LABELS, CUSTOMER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '../models';

@Pipe({ name: 'statusLabel', pure: true })
export class StatusLabelPipe implements PipeTransform {
  transform(valor: string, tipo?: 'pedido' | 'factura' | 'cliente' | 'pago'): string {
    if (!valor) return '—';
    switch (tipo) {
      case 'pedido':
        return ORDER_STATUS_LABELS[valor as keyof typeof ORDER_STATUS_LABELS] ?? valor;
      case 'factura':
        return INVOICE_STATUS_LABELS[valor as keyof typeof INVOICE_STATUS_LABELS] ?? valor;
      case 'cliente':
        return CUSTOMER_STATUS_LABELS[valor as keyof typeof CUSTOMER_STATUS_LABELS] ?? valor;
      case 'pago':
        return PAYMENT_STATUS_LABELS[valor as keyof typeof PAYMENT_STATUS_LABELS] ?? valor;
      default:
        return ORDER_STATUS_LABELS[valor as keyof typeof ORDER_STATUS_LABELS] ??
          INVOICE_STATUS_LABELS[valor as keyof typeof INVOICE_STATUS_LABELS] ??
          CUSTOMER_STATUS_LABELS[valor as keyof typeof CUSTOMER_STATUS_LABELS] ??
          PAYMENT_STATUS_LABELS[valor as keyof typeof PAYMENT_STATUS_LABELS] ??
          valor;
    }
  }
}