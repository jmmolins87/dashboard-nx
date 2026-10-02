import { Component, input } from '@angular/core';

@Component({
  selector: 'app-orders-table',
  imports: [],
  templateUrl: './orders-table.html',
  styleUrl: './orders-table.scss',
})
export class OrdersTable {
  readonly cargando = input.required<boolean>();
  readonly pagina = input.required<number>();
  readonly totalPaginas = input.required<number>();
  readonly filas = input.required<any[]>();
  readonly columnas = input.required<any[]>();
  readonly filaClic = input<(fila: any) => void>();
}