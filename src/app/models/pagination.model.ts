export interface PageInfo {
  pagina: number;
  tamano: number;
  total: number;
  paginas: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  pagina: number;
  paginas: number;
  tamano: number;
}

export type SortDirection = 'asc' | 'desc';

export interface PaginatedRequest {
  pagina: number;
  tamano: number;
  orden?: string;
  direccion?: SortDirection;
}

export function pageInfoVacio(tamano = 10): PageInfo {
  return { pagina: 1, tamano, total: 0, paginas: 1 };
}
