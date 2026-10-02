import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', pure: true })
export class TruncatePipe implements PipeTransform {
  transform(valor: string, maximo: number = 50): string {
    if (!valor) return '';
    return valor.length <= maximo ? valor : `${valor.slice(0, maximo - 1)}…`;
  }
}