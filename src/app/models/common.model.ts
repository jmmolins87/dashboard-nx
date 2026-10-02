export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface Money {
  amount: number;
  currency: 'EUR' | 'USD' | 'GBP';
}

export interface ContactInfo {
  email: string;
  phone: string;
  website?: string;
}

export interface AuditEntry {
  fecha: string;
  usuario: string;
  accion: string;
  entidad: string;
  entidadId: string;
  cambios?: Record<string, { anterior: unknown; nuevo: unknown }>;
}

export const DEFAULT_ADDRESS: Address = {
  street: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'ES',
};