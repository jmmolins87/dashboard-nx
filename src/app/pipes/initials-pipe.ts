import { Pipe, PipeTransform } from '@angular/core';
import { iniciales } from '../../vendor/acme-utils/text';

@Pipe({ name: 'initials', pure: true })
export class InitialsPipe implements PipeTransform {
  transform(valor: string): string {
    if (!valor) return '?';
    return iniciales(valor);
  }
}