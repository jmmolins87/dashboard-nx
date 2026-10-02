import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-ui-skeleton',
  standalone: true,
  templateUrl: './ui-skeleton.html',
  styleUrl: './ui-skeleton.scss',
})
export class UiSkeleton {
  readonly tipo = input<'linea' | 'bloque' | 'circular' | 'texto'>('linea');
  readonly lineas = input(3);
  readonly ancho = input<string>('100%');
  readonly alto = input<string>('1rem');

  readonly estilos = computed(() => ({
    width: this.ancho(),
    height: this.tipo() === 'linea' || this.tipo() === 'texto' ? this.alto() : 'auto',
  }));
}