import { MOCK_NOW } from './seed.utils';

export function ahora(): number {
  return MOCK_NOW;
}

export function fechaAnclada(diasDesfase: number): string {
  return new Date(MOCK_NOW + diasDesfase * 86_400_000).toISOString();
}

export function rangoUltimosDias(n: number): { desde: string; hasta: string } {
  return {
    hasta: new Date(MOCK_NOW).toISOString(),
    desde: new Date(MOCK_NOW - n * 86_400_000).toISOString(),
  };
}