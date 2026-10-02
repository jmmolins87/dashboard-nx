let contador = 1000;

export function siguienteId(prefijo: string): string {
  contador++;
  return `${prefijo}-${contador}`;
}

export function reiniciarContadorId(valor = 1000): void {
  contador = valor;
}

export function idNumerico(prefijo: string, n: number, ancho = 4): string {
  return `${prefijo}${String(n).padStart(ancho, '0')}`;
}
