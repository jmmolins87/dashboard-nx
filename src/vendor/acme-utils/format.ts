export type Moneda = 'EUR' | 'USD' | 'GBP';

const SIMBOLOS: Record<Moneda, string> = { EUR: '€', USD: '$', GBP: '£' };

export function formatearMoneda(valor: number, moneda: Moneda = 'EUR', decimales = 2): string {
  const negativo = valor < 0;
  const abs = Math.abs(valor);
  const entero = Math.trunc(abs).toString();
  const parteEntera = agruparMiles(entero);
  const parteDecimal = decimales > 0 ? ',' + abs.toFixed(decimales).split('.')[1] : '';
  return `${negativo ? '-' : ''}${parteEntera}${parteDecimal} ${SIMBOLOS[moneda]}`;
}

export function formatearNumero(valor: number, decimales = 0): string {
  const negativo = valor < 0;
  const abs = Math.abs(valor);
  const fijo = abs.toFixed(decimales);
  const [entero, decimal] = fijo.split('.');
  return `${negativo ? '-' : ''}${agruparMiles(entero)}${decimal ? ',' + decimal : ''}`;
}

export function formatearPorcentaje(valor: number, decimales = 1): string {
  return `${formatearNumero(valor * 100, decimales)} %`;
}

export function parsearMoneda(texto: string): number {
  const limpio = texto.replace(/[^\d,-]/g, '').replace(',', '.');
  const valor = Number.parseFloat(limpio);
  return Number.isNaN(valor) ? 0 : valor;
}

function agruparMiles(entero: string): string {
  const grupos: string[] = [];
  let resto = entero;
  while (resto.length > 3) {
    grupos.unshift(resto.slice(-3));
    resto = resto.slice(0, -3);
  }
  grupos.unshift(resto);
  return grupos.join('.');
}
