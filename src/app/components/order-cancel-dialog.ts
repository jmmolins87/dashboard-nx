import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiButton } from '../shared/components/ui-button';

@Component({
  selector: 'app-order-cancel-dialog',
  imports: [CommonModule, FormsModule, UiButton],
  templateUrl: './order-cancel-dialog.html',
  styleUrl: './order-cancel-dialog.scss',
})
export class OrderCancelDialog {
  readonly abierto = input(false);
  readonly motivo = input('');
  readonly cerrar = output<void>();
  readonly confirmar = output<string>();

  protected onConfirmar(): void {
    this.confirmar.emit(this.motivo());
    this.cerrar.emit();
  }

  protected onCancelar(): void {
    this.cerrar.emit();
  }
}