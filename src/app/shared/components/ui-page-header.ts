import { Component, input } from '@angular/core';
import { UiButton, VarianteBoton } from './ui-button';

@Component({
  selector: 'app-ui-page-header',
  imports: [UiButton],
  templateUrl: './ui-page-header.html',
  styleUrl: './ui-page-header.scss',
})
export class UiPageHeader {
  readonly titulo = input<string>('');
  readonly subtitulo = input<string>('');
  readonly breadcrumbs = input<readonly { etiqueta: string; url?: string }[]>([]);
  readonly acciones = input<readonly { etiqueta: string; variante?: VarianteBoton; clic: () => void }[]>([]);
}