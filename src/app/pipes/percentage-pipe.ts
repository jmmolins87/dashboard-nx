import { Pipe, PipeTransform } from '@angular/core';
import { formatearPorcentaje } from '../../vendor/acme-utils/format';

@Pipe({ name: 'percentage', pure: true })
export class PercentagePipe implements PipeTransform {
  transform(valor: number, decimales = 1): string {
    if (!Number.isFinite(valor)) return '—';
    return formatearPorcentaje(valor, decimales);
  }
}