export type InvoiceStatus = 'borrador' | 'emitida' | 'pagada' | 'vencida' | 'anulada';

export interface InvoiceLine {
  pedidoId: string;
  productoId: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
}

export interface Invoice {
  id: string;
  numero: string;
  pedidoId: string;
  clienteId: string;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: InvoiceStatus;
  lineas: InvoiceLine[];
  base: number;
  iva: number;
  total: number;
  pagado: number;
  notas: string;
}

export interface InvoiceFilters {
  texto: string;
  estado: InvoiceStatus | 'todos';
  clienteId: string | null;
  soloPendientes: boolean;
}

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  borrador: 'Borrador',
  emitida: 'Emitida',
  pagada: 'Pagada',
  vencida: 'Vencida',
  anulada: 'Anulada',
};

export const INVOICE_STATUSES: InvoiceStatus[] = ['borrador', 'emitida', 'pagada', 'vencida', 'anulada'];

export function importePendiente(factura: Invoice): number {
  return Math.max(0, factura.total - factura.pagado);
}
