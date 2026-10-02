import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'acme-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './acme-card.html',
  styleUrl: './acme-card.scss',
})
export class AcmeCard {
  readonly titulo = input<string>('');
  readonly subtitulo = input<string>('');
  readonly elevada = input(false);
  readonly sinCuerpo = input(false);
}
