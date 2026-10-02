import { Pipe, PipeTransform, inject } from '@angular/core';
import { AppState } from '../services/app-state';
import { formatearMoneda, Moneda } from '../../vendor/acme-utils/format';

@Pipe({ name: 'currencyDisplay', pure: false })
export class CurrencyDisplayPipe implements PipeTransform {
  private readonly state = inject(AppState);

  transform(valor: number | string | null | undefined, moneda?: Moneda): string {
    if (valor === null || valor === undefined) return '—';
    const n = typeof valor === 'string' ? parseFloat(valor) : valor;
    if (Number.isNaN(n)) return '—';
    const pref = moneda ?? this.state.preferencias().moneda;
    return formatearMoneda(n, pref);
  }
}