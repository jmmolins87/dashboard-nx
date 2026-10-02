export type ToastType = 'exito' | 'error' | 'info' | 'advertencia';

export interface ToastMessage {
  id: string;
  tipo: ToastType;
  titulo: string;
  mensaje?: string;
  duracion?: number;
}

export interface Notification {
  id: string;
  tipo: 'pedido' | 'factura' | 'pago' | 'cliente' | 'stock' | 'sistema';
  titulo: string;
  detalle: string;
  leida: boolean;
  fecha: string;
  enlace?: string;
}

export const TOAST_DEFAULTS: Record<ToastType, number> = {
  exito: 3000,
  error: 6000,
  info: 4000,
  advertencia: 5000,
};