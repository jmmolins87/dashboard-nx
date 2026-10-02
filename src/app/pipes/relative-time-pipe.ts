import { Pipe, PipeTransform } from '@angular/core';
import { MOCK_NOW } from '../utils/seed.utils';
import { tiempoRelativo } from '../../vendor/acme-utils/dates';

@Pipe({ name: 'relativeTime', pure: false })
export class RelativeTimePipe implements PipeTransform {
  transform(valor: string | Date | null | undefined): string {
    if (!valor) return '—';
    const iso = typeof valor === 'string' ? valor : valor.toISOString();
    return tiempoRelativo(iso, MOCK_NOW);
  }
}