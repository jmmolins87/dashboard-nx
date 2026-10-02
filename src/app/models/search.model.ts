export type SearchCategory = 'pedidos' | 'clientes' | 'facturas' | 'productos' | 'usuarios';

export interface SearchResult {
  id: string;
  categoria: SearchCategory;
  titulo: string;
  subtitulo: string;
  url: string;
  icono?: string;
}