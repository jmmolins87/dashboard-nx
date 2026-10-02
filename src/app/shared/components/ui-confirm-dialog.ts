import { Component, input, output, inject } from '@angular/core';
import { Dialog } from '../../services/dialog';

@Component({
  selector: 'app-ui-confirm-dialog',
  templateUrl: './ui-confirm-dialog.html',
  styleUrl: './ui-confirm-dialog.scss',
})
export class UiConfirmDialog {
  private readonly dialog = inject(Dialog);
  readonly config = input.required<{ titulo: string; mensaje: string; confirmarTexto?: string; cancelarTexto?: string }>();

  protected abrir(): void {
    this.dialog.confirmar(this.config()).then((r: boolean) => {
      if (r) this.confirmar.emit();
      else this.cancelar.emit();
    });
  }

  readonly confirmar = output<void>();
  readonly cancelar = output<void>();
}