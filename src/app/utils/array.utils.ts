import type { PagedResult } from '../models/pagination.model';

export interface Comparador<T> {
  clave: keyof T & string;
  direccion: 'asc' | 'desc';
}

export function ordenarPor<T>(lista: T[], clave: keyof T & string, direccion: 'asc' | 'desc' = 'asc'): T[] {
  const factor = direccion === 'asc' ? 1 : -1;
  return [...lista].sort((a, b) => {
    const va = a[clave];
    const vb = b[clave];
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * factor;
    return String(va ?? '').localeCompare(String(vb ?? ''), 'es') * factor;
  });
}

export function agruparPor<T, K extends string>(lista: T[], clave: (item: T) => K): Map<K, T[]> {
  const mapa = new Map<K, T[]>();
  for (const item of lista) {
    const grupo = clave(item);
    const actual = mapa.get(grupo);
    if (actual) {
      actual.push(item);
    } else {
      mapa.set(grupo, [item]);
    }
  }
  return mapa;
}

export function sumar<T>(lista: T[], selector: (item: T) => number): number {
  return lista.reduce((total, item) => total + selector(item), 0);
}

export function paginar<T>(lista: T[], pagina: number, tamano: number): PagedResult<T> {
  const total = lista.length;
  const paginas = Math.max(1, Math.ceil(total / tamano));
  const paginaSegura = Math.min(Math.max(1, pagina), paginas);
  const inicio = (paginaSegura - 1) * tamano;
  return {
    items: lista.slice(inicio, inicio + tamano),
    total,
    pagina: paginaSegura,
    paginas,
    tamano,
  };
}

export function primeros<T>(lista: T[], n: number): T[] {
  return lista.slice(0, n);
}

export function contarSi<T>(lista: T[], predicado: (item: T) => boolean): number {
  return lista.reduce((total, item) => (predicado(item) ? total + 1 : total), 0);
}

export function maximoPor<T>(lista: T[], selector: (item: T) => number): T | null {
  if (lista.length === 0) return null;
  return lista.reduce((mejor, item) => (selector(item) > selector(mejor) ? item : mejor), lista[0]);
}
