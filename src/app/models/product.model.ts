export type ProductCategory =
  | 'ferreteria'
  | 'electricidad'
  | 'fontaneria'
  | 'pintura'
  | 'herramientas'
  | 'jardineria';

export type ProductStatus = 'activo' | 'descatalogado' | 'sin-stock';

export interface Product {
  id: string;
  sku: string;
  nombre: string;
  descripcion: string;
  categoria: ProductCategory;
  precio: number;
  coste: number;
  stock: number;
  stockMinimo: number;
  estado: ProductStatus;
  proveedor: string;
  ubicacion: string;
}

export interface ProductFilters {
  texto: string;
  categoria: ProductCategory | 'todas';
  soloBajoStock: boolean;
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  ferreteria: 'Ferretería',
  electricidad: 'Electricidad',
  fontaneria: 'Fontanería',
  pintura: 'Pintura',
  herramientas: 'Herramientas',
  jardineria: 'Jardinería',
};

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  activo: 'Activo',
  descatalogado: 'Descatalogado',
  'sin-stock': 'Sin stock',
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'ferreteria',
  'electricidad',
  'fontaneria',
  'pintura',
  'herramientas',
  'jardineria',
];

export function tieneBajoStock(producto: Product): boolean {
  return producto.stock <= producto.stockMinimo;
}
