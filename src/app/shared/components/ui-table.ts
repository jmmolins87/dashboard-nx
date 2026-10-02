import { Component, input, output, computed } from '@angular/core';

export interface UiColumna {
  clave: string;
  titulo: string;
  alineacion?: 'izquierda' | 'derecha' | 'centro';
}

@Component({
  selector: 'app-ui-table',
  templateUrl: './ui-table.html',
  styleUrl: './ui-table.scss',
})
export class UiTable {
  readonly columnas = input.required<UiColumna[]>();
  readonly filas = input.required<Record<string, unknown>[]>();
  readonly cargando = input(false);
  readonly mensajeVacio = input('Sin resultados');
  readonly filaClic = output<Record<string, unknown>>();

  readonly vacio = computed(() => this.filas().length === 0 && !this.cargando());

  protected celda(fila: Record<string, unknown>, col: UiColumna): string {
    return fila[col.clave] === null || fila[col.clave] === undefined ? '—' : String(fila[col.clave]);
  }

  protected onClick(fila: Record<string, unknown>): void {
    this.filaClic.emit(fila);
  }
}