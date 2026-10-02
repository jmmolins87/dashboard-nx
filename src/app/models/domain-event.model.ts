export type DomainEventType =
  | 'order-cancelled'
  | 'order-status-changed'
  | 'order-updated'
  | 'payment-registered'
  | 'invoice-created'
  | 'customer-updated'
  | 'stock-adjusted'
  | 'user-created'
  | 'user-deleted'
  | 'preferences-updated';

export interface DomainEvent {
  tipo: DomainEventType;
  payload: unknown;
  emitidoEn: number;
}

export function esEventoDePedido(tipo: DomainEventType): boolean {
  return tipo.startsWith('order-');
}
export function esEventoDeFacturacion(tipo: DomainEventType): boolean {
  return tipo.startsWith('payment-') || tipo.startsWith('invoice-');
}
export function esEventoDeInventario(tipo: DomainEventType): boolean {
  return tipo.startsWith('stock-');
}