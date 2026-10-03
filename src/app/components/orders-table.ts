import { Component, input } from '@angular/core';
import { DateDisplayPipe } from '../pipes/date-display-pipe';
import { CurrencyDisplayPipe } from '../pipes/currency-display-pipe';

@Component({
  selector: 'app-orders-table',
  imports: [DateDisplayPipe, CurrencyDisplayPipe],
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