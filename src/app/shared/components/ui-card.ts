import { Component, input, output, computed } from '@angular/core';
import { UiButton } from './ui-button';

@Component({
  selector: 'app-ui-card',
  imports: [UiButton],
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.scss',
})
export class UiCard {
  readonly titulo = input<string>('');
  readonly subtitulo = input<string>('');
  readonly elevada = input(false);
  readonly pieVisible = input(false);
  readonly accionPrincipal = output<void>();
  readonly accionSecundaria = output<void>();

  readonly clases = computed(() => ['ui-card', this.elevada() ? 'ui-card--elevada' : '']);
}