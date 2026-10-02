import { Directive, ElementRef, HostListener, HostBinding, inject, input, output } from '@angular/core';
import { AppState } from '../services/app-state';

@Directive({ selector: '[appSortable]' })
export class SortableHeaderDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly state = inject(AppState);
  readonly appSortable = input.required<string>();

  readonly ordenCambia = output<{ clave: string; direccion: 'asc' | 'desc' }>();

  @HostListener('click')
  onClick(): void {
    const clave = this.appSortable();
    this.state.filtrosPedidos.update((f) => {
      if (f.orden === clave) {
        f.direccion = f.direccion === 'asc' ? 'desc' : 'asc';
      } else {
        f.orden = clave;
        f.direccion = 'asc';
      }
      this.ordenCambia.emit({ clave, direccion: f.direccion! });
      return f;
    });
  }

  @HostBinding('attr.aria-sort')
  get ariaSort() {
    const clave = this.appSortable();
    const f = this.state.filtrosPedidos();
    if (f.orden !== clave) return 'none';
    return f.direccion === 'asc' ? 'ascending' : 'descending';
  }
}