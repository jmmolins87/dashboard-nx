export const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const DIAS_SEMANA = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export type EstiloFecha = 'corto' | 'medio' | 'largo' | 'iso';

export function formatearFecha(iso: string | Date, estilo: EstiloFecha = 'corto'): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return '';
  const dia = dos(d.getUTCDate());
  const mes = d.getUTCMonth();
  const anio = d.getUTCFullYear();
  if (estilo === 'iso') return `${anio}-${dos(mes + 1)}-${dia}`;
  if (estilo === 'medio') return `${dia} ${MESES_CORTOS[mes]} ${anio}`;
  if (estilo === 'largo') return `${dia} de ${MESES_LARGOS[mes]} de ${anio}`;
  return `${dia}/${dos(mes + 1)}/${anio}`;
}

export function formatearHora(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${dos(d.getUTCHours())}:${dos(d.getUTCMinutes())}`;
}

export function tiempoRelativo(iso: string, referencia: number): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const dias = Math.floor((referencia - t) / 86_400_000);
  if (dias < 0) return `en ${-dias} días`;
  if (dias === 0) return 'hoy';
  if (dias === 1) return 'ayer';
  if (dias < 30) return `hace ${dias} días`;
  const meses = Math.floor(dias / 30);
  if (meses < 12) return `hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  const anios = Math.floor(meses / 12);
  return `hace ${anios} ${anios === 1 ? 'año' : 'años'}`;
}

export function nombreMes(mes: number, largo = false): string {
  const idx = ((mes % 12) + 12) % 12;
  return largo ? MESES_LARGOS[idx] : MESES_CORTOS[idx];
}

export interface MesReferencia {
  anio: number;
  mes: number;
  etiqueta: string;
}

export function ultimosMeses(n: number, referencia: Date): MesReferencia[] {
  const resultado: MesReferencia[] = [];
  let anio = referencia.getUTCFullYear();
  let mes = referencia.getUTCMonth();
  for (let i = 0; i < n; i++) {
    resultado.unshift({ anio, mes, etiqueta: `${MESES_CORTOS[mes]} ${String(anio).slice(2)}` });
    mes--;
    if (mes < 0) {
      mes = 11;
      anio--;
    }
  }
  return resultado;
}

export function claveMes(anio: number, mes: number): string {
  return `${anio}-${dos(mes + 1)}`;
}

export function anadirDias(iso: string, dias: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString();
}

export function diasEntre(desde: string, hasta: string): number {
  return Math.round((new Date(hasta).getTime() - new Date(desde).getTime()) / 86_400_000);
}

export function esFechaPasada(iso: string, referencia: string): boolean {
  return new Date(iso).getTime() < new Date(referencia).getTime();
}

function dos(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}
