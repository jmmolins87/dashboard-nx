import { Component, input, output, effect } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.html',
  styleUrl: './ui-modal.scss',
})
export class UiModal {
  readonly abierto = input(false);
  readonly titulo = input<string>('');
  readonly tamano = input<'pequeño' | 'mediano' | 'grande'>('mediano');
  readonly cerrar = output<void>();

  protected onOverlayClick(): void {
    this.cerrar.emit();
  }

  protected onDialogClick(e: MouseEvent): void {
    e.stopPropagation();
  }
}