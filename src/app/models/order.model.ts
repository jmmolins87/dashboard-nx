import { CUSTOMER_SEGMENT_LABELS } from './customer.model';

export type OrderStatus =
  | 'borrador'
  | 'confirmado'
  | 'preparacion'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

export type OrderPriority = 'baja' | 'media' | 'alta';

export interface OrderItem {
  productoId: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
}

export interface Order {
  id: string;
  numero: string;
  clienteId: string;
  fecha: string;
  fechaEntregaEstimada: string;
  estado: OrderStatus;
  prioridad: OrderPriority;
  items: OrderItem[];
  descuento: number;
  gastosEnvio: number;
  notas: string;
  creadoPor: string;
}

export interface OrderRef {
  id: string;
  numero: string;
  estado: OrderStatus;
  fecha: string;
  total: number;
}

export interface OrderFilters {
  texto: string;
  estado: OrderStatus | 'todos';
  clienteId: string | null;
  soloPendientes: boolean;
  orden?: string;
  direccion?: 'asc' | 'desc';
}

export interface OrderEventEntry {
  fecha: string;
  estado: OrderStatus;
  detalle: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  borrador: 'Borrador',
  confirmado: 'Confirmado',
  preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'borrador',
  'confirmado',
  'preparacion',
  'enviado',
  'entregado',
];

export function esEstadoFinal(estado: OrderStatus): boolean {
  return estado === 'entregado' || estado === 'cancelado';
}

export function prioridadSugerida(segmentoCliente: keyof typeof CUSTOMER_SEGMENT_LABELS): OrderPriority {
  if (segmentoCliente === 'vip') return 'alta';
  if (segmentoCliente === 'nuevo') return 'baja';
  return 'media';
}
