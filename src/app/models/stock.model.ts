export type MovementType = 'entrada' | 'salida' | 'ajuste' | 'devolucion';

export interface StockMovement {
  id: string;
  productoId: string;
  tipo: MovementType;
  cantidad: number;
  motivo: string;
  referencia: string;
  fecha: string;
  usuario: string;
}

export interface StockLevel {
  productoId: string;
  stockActual: number;
  stockReservado: number;
  stockDisponible: number;
}

export const MOVEMENT_TYPE_LABELS: Record<MovementType, string> = {
  entrada: 'Entrada',
  salida: 'Salida',
  ajuste: 'Ajuste',
  devolucion: 'Devolución',
};