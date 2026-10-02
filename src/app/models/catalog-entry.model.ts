import type { ProductCategory } from './product.model';

export interface CatalogEntry {
  sku: string;
  denominacion: string;
  categoria: ProductCategory;
  precioActual: number;
  stockDisponible: number;
  activo: boolean;
}

export interface CatalogSnapshot {
  generadoEn: string;
  totalReferencias: number;
  entradas: CatalogEntry[];
}
