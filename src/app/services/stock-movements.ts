import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { StockMovement, MovementType } from '../models/stock.model';

@Service()
export class StockMovements {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);

  readonly lista = computed(() => this.state.movimientosStock());

  readonly porTipo = computed(() => {
    const mapa = new Map<MovementType, number>();
    for (const m of this.state.movimientosStock()) {
      mapa.set(m.tipo, (mapa.get(m.tipo) ?? 0) + m.cantidad);
    }
    return mapa;
  });

  registrar(productoId: string, tipo: MovementType, cantidad: number, motivo: string, usuario: string): void {
    const mov: StockMovement = {
      id: `MOV-${Date.now()}`,
      productoId,
      tipo,
      cantidad,
      motivo,
      referencia: `AJU-${Date.now()}`,
      fecha: new Date().toISOString(),
      usuario,
    };
    this.state.agregarMovimientoStock(mov);
  }

  movimientosDeProducto(productoId: string): StockMovement[] {
    return this.state.movimientosStock().filter((m) => m.productoId === productoId).slice(0, 50);
  }
}