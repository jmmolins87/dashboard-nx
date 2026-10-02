import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; import { PLATFORM_ID } from '@angular/core';
import { aCsv, descargarCsv } from '../utils/csv.utils';

@Service()
export class CsvExport {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  exportar(titulo: string, filas: (string | number)[][], cabeceras: string[]): void {
    if (!this.isBrowser) return;
    const csv = aCsv(cabeceras, filas, (f) => f.map(String));
    descargarCsv(titulo, csv);
  }

  exportarDataset(dataset: { titulo: string; series: { puntos: { etiqueta: string; valor: number }[] }[] }): void {
    if (!this.isBrowser) return;
    const filas = dataset.series[0].puntos.map((p) => [p.etiqueta, p.valor]);
    this.exportar(dataset.titulo, filas, ['Etiqueta', 'Valor']);
  }
}