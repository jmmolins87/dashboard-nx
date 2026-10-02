export function mulberry32(semilla: number): () => number {
  let a = semilla >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const SEMILLA_FIJA = 1337;
export const MOCK_NOW = new Date('2026-09-30T12:00:00.000Z').getTime();

export type Rng = () => number;

export function entero(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function elegir<T>(rng: Rng, opciones: readonly T[]): T {
  return opciones[Math.floor(rng() * opciones.length)];
}

export function elegirN<T>(rng: Rng, opciones: readonly T[], n: number): T[] {
  const copia = [...opciones];
  const resultado: T[] = [];
  for (let i = 0; i < n && copia.length > 0; i++) {
    const idx = Math.floor(rng() * copia.length);
    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
}

export function azar(rng: Rng, probabilidad: number): boolean {
  return rng() < probabilidad;
}

export function ponderar<T extends string>(rng: Rng, tabla: readonly (readonly [T, number])[]): T {
  const total = tabla.reduce((suma, [, peso]) => suma + peso, 0);
  let umbral = rng() * total;
  for (const [valor, peso] of tabla) {
    umbral -= peso;
    if (umbral <= 0) return valor;
  }
  return tabla[tabla.length - 1][0];
}
