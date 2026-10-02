import { Component, input, output, computed, signal } from '@angular/core';

@Component({
  selector: 'app-ui-tabs',
  templateUrl: './ui-tabs.html',
  styleUrl: './ui-tabs.scss',
})
export class UiTabs {
  readonly pestanas = input<readonly { id: string; titulo: string }[]>([]);
  readonly activa = signal<string>('');
  readonly cambia = output<string>();

  readonly activaId = computed(() => (this.activa() ?? this.pestanas()[0]?.id) ?? '');

  seleccionar(id: string): void {
    this.activa.set(id);
    this.cambia.emit(id);
  }
}