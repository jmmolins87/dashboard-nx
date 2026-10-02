import { Pipe, PipeTransform, inject } from '@angular/core';
import { AppState } from '../services/app-state';
import { formatearFecha, EstiloFecha } from '../../vendor/acme-utils/dates';

@Pipe({ name: 'dateDisplay', pure: false })
export class DateDisplayPipe implements PipeTransform {
  private readonly state = inject(AppState);

  transform(valor: string | Date | null | undefined, estilo?: EstiloFecha): string {
    if (!valor) return '—';
    return formatearFecha(valor, estilo ?? this.state.preferencias().formatoFecha);
  }
}