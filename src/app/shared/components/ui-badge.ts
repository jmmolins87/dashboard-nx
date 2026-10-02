import { Component, input, computed } from '@angular/core';

export type VarianteBadge = 'primario' | 'secundario' | 'exito' | 'advertencia' | 'peligro' | 'info';

@Component({
  selector: 'app-ui-badge',
  templateUrl: './ui-badge.html',
  styleUrl: './ui-badge.scss',
})
export class UiBadge {
  readonly variante = input<VarianteBadge>('primario');
  readonly puntos = input(false);
  readonly clicable = input(false);

  readonly clases = computed(() => [
    'ui-badge',
    `ui-badge--${this.variante()}`,
    this.puntos() ? 'ui-badge--punto' : '',
    this.clicable() ? 'ui-badge--clicable' : '',
  ]);
}