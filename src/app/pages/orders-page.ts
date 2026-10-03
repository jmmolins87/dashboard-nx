import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Orders } from '../services/orders';
import { CustomerService as Customers } from '../services/customers';
import { AppState } from '../services/app-state';
import { OrdersTable } from '../components/orders-table';
import { OrdersFilterPanel } from '../components/orders-filter-panel';
import { UiPageHeader } from '../shared/components/ui-page-header';
import { UiPagination } from '../shared/components/ui-pagination';
import { UiCard } from '../shared/components/ui-card';
import { OrderFilters, OrderStatus } from '../models/order.model';

@Component({
  selector: 'app-orders-page',
  imports: [CommonModule, FormsModule, OrdersTable, OrdersFilterPanel, UiPageHeader, UiPagination, UiCard],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage {
  private readonly orders = inject(Orders);
  private readonly state = inject(AppState);
  private readonly customers = inject(Customers);

  readonly filtros = signal<OrderFilters>({ texto: '', estado: 'todos', clienteId: null, soloPendientes: false });
  readonly pagina = signal(1);
  readonly columnasPedidos = signal<any[]>([
    { clave: 'numero', titulo: 'Número', alineacion: 'izquierda' },
    { clave: 'fecha', titulo: 'Fecha', alineacion: 'izquierda' },
    { clave: 'clienteId', titulo: 'Cliente', alineacion: 'izquierda' },
    { clave: 'estado', titulo: 'Estado', alineacion: 'centro' },
    { clave: 'total', titulo: 'Total', alineacion: 'derecha' },
  ]);

  readonly lista = computed(() => this.orders.lista());
  readonly totalPaginas = computed(() => Math.ceil(this.lista().length / 10) || 1);

  onFiltrosChange(f: Partial<OrderFilters>): void {
    this.filtros.update((prev) => ({ ...prev, ...f }));
    this.pagina.set(1);
  }

  onPaginaChange(p: number): void {
    this.pagina.set(p);
  }

  onPaginaChangeEmit(event: unknown): void {
    this.pagina.set(event as number);
  }

  public log(msg: string): void {
    console.log(msg);
  }
}