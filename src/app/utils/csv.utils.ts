export function aCsv<T>(cabeceras: string[], filas: T[], getValores: (f: T) => string[]): string {
  const escape = (s: string): string => {
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const lineas: string[] = [cabeceras.map(escape).join(',')];
  for (const fila of filas) {
    lineas.push(getValores(fila).map(escape).join(','));
  }
  return lineas.join('\r\n');
}

export function descargarCsv(nombre: string, contenido: string): void {
  if (typeof document === 'undefined') return;
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nombre}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}