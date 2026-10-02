export type PaymentMethod = 'transferencia' | 'tarjeta' | 'efectivo' | 'domiciliacion';
export type PaymentStatus = 'registrado' | 'conciliado' | 'rechazado';

export interface Payment {
  id: string;
  facturaId: string;
  clienteId: string;
  fecha: string;
  importe: number;
  metodo: PaymentMethod;
  estado: PaymentStatus;
  referencia: string;
  notas: string;
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  transferencia: 'Transferencia',
  tarjeta: 'Tarjeta',
  efectivo: 'Efectivo',
  domiciliacion: 'Domiciliación',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  registrado: 'Registrado',
  conciliado: 'Conciliado',
  rechazado: 'Rechazado',
};
