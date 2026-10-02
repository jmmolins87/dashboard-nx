import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-ui-pagination',
  templateUrl: './ui-pagination.html',
  styleUrl: './ui-pagination.scss',
})
export class UiPagination {
  readonly pagina = input.required<number>();
  readonly totalPaginas = input.required<number>();
  readonly tamanoPagina = input(10);
  readonly total = input(0);
  readonly cambiaPagina = output<number>();

  readonly paginasVisibles = computed(() => {
    const total = this.totalPaginas();
    const actual = this.pagina();
    const inicio = Math.max(1, Math.min(actual - 2, total - 4));
    const fin = Math.min(total, inicio + 4);
    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  });

  irA(p: number): void {
    if (p < 1 || p > this.totalPaginas() || p === this.pagina()) return;
    this.cambiaPagina.emit(p);
  }
}