import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type VarianteBoton = 'primario' | 'secundario' | 'fantasma' | 'peligro';
export type TamanoBoton = 'pequeño' | 'mediano' | 'grande';

@Component({
  selector: 'acme-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './acme-button.html',
  styleUrl: './acme-button.scss',
})
export class AcmeButton {
  readonly variante = input<VarianteBoton>('primario');
  readonly tamano = input<TamanoBoton>('mediano');
  readonly cargando = input(false);
  readonly deshabilitado = input(false);
  readonly bloqueado = input(false);

  readonly clases = computed(() => [
    'acme-btn',
    `acme-btn--${this.variante()}`,
    `acme-btn--${this.tamano()}`,
    this.cargando() ? 'acme-btn--cargando' : '',
  ]);

  readonly inactivo = computed(() => this.deshabilitado() || this.bloqueado() || this.cargando());
}
