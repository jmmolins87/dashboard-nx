import { Component, input, output } from '@angular/core';
import { UiButton } from './ui-button';

@Component({
  selector: 'app-ui-empty-state',
  standalone: true,
  imports: [UiButton],
  templateUrl: './ui-empty-state.html',
  styleUrl: './ui-empty-state.scss',
})
export class UiEmptyState {
  readonly icono = input<string>('📭');
  readonly titulo = input<string>('Sin resultados');
  readonly descripcion = input<string>('No hay datos para mostrar');
  readonly accionTexto = input<string>('');
  readonly accion = output<void>();

  ejecutarAccion(): void {
    if (this.accionTexto()) this.accion.emit();
  }
}