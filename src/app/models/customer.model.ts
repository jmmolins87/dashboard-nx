import type { OrderRef } from './order.model';

export type CustomerSegment = 'vip' | 'mayorista' | 'minorista' | 'nuevo';
export type CustomerStatus = 'activo' | 'inactivo' | 'moroso' | 'bloqueado';

export interface CustomerAddress {
  calle: string;
  ciudad: string;
  provincia: string;
  cp: string;
  pais: string;
}

export interface Customer {
  id: string;
  codigo: string;
  nombre: string;
  razonSocial: string;
  cif: string;
  email: string;
  telefono: string;
  segmento: CustomerSegment;
  estado: CustomerStatus;
  direccion: CustomerAddress;
  limiteCredito: number;
  iban: string;
  alta: string;
  contacto: string;
}

export interface CustomerWithHistory extends Customer {
  pedidos: OrderRef[];
}

export interface CustomerFilters {
  texto: string;
  segmento: CustomerSegment | 'todos';
  estado: CustomerStatus | 'todos';
  soloConDeuda: boolean;
}

export const CUSTOMER_SEGMENT_LABELS: Record<CustomerSegment, string> = {
  vip: 'VIP',
  mayorista: 'Mayorista',
  minorista: 'Minorista',
  nuevo: 'Nuevo',
};

export const CUSTOMER_STATUS_LABELS: Record<CustomerStatus, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  moroso: 'Moroso',
  bloqueado: 'Bloqueado',
};

export const CUSTOMER_SEGMENTS: CustomerSegment[] = ['vip', 'mayorista', 'minorista', 'nuevo'];
export const CUSTOMER_STATUSES: CustomerStatus[] = ['activo', 'inactivo', 'moroso', 'bloqueado'];
