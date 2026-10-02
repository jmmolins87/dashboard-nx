import { Component, input, output, computed } from '@angular/core';

export type VarianteBoton = 'primario' | 'secundario' | 'fantasma' | 'peligro' | 'enlace';
export type TamanoBoton = 'pequeño' | 'mediano' | 'grande';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
})
export class UiButton {
  readonly variante = input<VarianteBoton>('primario');
  readonly tamano = input<TamanoBoton>('mediano');
  readonly deshabilitado = input(false);
  readonly cargando = input(false);
  readonly tipo = input<'button' | 'submit' | 'reset'>('button');
  readonly clic = output<MouseEvent>();

  readonly clases = computed(() => [
    'ui-btn',
    `ui-btn--${this.variante()}`,
    `ui-btn--${this.tamano()}`,
    this.cargando() ? 'ui-btn--cargando' : '',
  ]);

  protected onClick(e: MouseEvent): void {
    if (!this.deshabilitado() && !this.cargando()) this.clic.emit(e);
  }
}