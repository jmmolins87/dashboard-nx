import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type TamanoModal = 'pequeño' | 'mediano' | 'grande';

@Component({
  selector: 'acme-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './acme-modal.html',
  styleUrl: './acme-modal.scss',
})
export class AcmeModal {
  readonly abierto = input(false);
  readonly titulo = input<string>('');
  readonly tamano = input<TamanoModal>('mediano');
  readonly cerrarAlFondo = input(true);
  readonly cerrar = output<void>();
}
