import { iniciales, capitalizar, truncar, slugify, normalizar } from '../../vendor/acme-utils/text';
import { formatearMoneda, formatearNumero, formatearPorcentaje } from '../../vendor/acme-utils/format';
import { formatearFecha, tiempoRelativo, nombreMes } from '../../vendor/acme-utils/dates';

export const helpers = {
  iniciales,
  capitalizar,
  truncar,
  slugify,
  normalizar,
  formatearMoneda,
  formatearNumero,
  formatearPorcentaje,
  formatearFecha,
  tiempoRelativo,
  nombreMes,
};

export function buildLabel(...partes: (string | null | undefined)[]): string {
  return partes.filter(Boolean).join(' · ');
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}