import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../services/app-state';
import { Reports } from '../services/reports';
import { Orders } from '../services/orders';
import { Billing } from '../services/billing';
import { CustomerService } from '../services/customers';
import { Inventory } from '../services/inventory';
import { StatusLabelPipe } from '../pipes/status-label-pipe';
import { CurrencyDisplayPipe } from '../pipes/currency-display-pipe';
import { LowStockPanel } from '../components/low-stock-panel';
import { OrdersTable } from '../components/orders-table';
import { KpiCard } from '../components/kpi-card';
import { UiPageHeader } from '../shared/components/ui-page-header';
import { UiCard } from '../shared/components/ui-card';
import { UiBadge, VarianteBadge } from '../shared/components/ui-badge';
import { InvoiceStatus } from '../models/invoice.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, UiCard, CurrencyDisplayPipe, StatusLabelPipe, LowStockPanel, UiBadge, OrdersTable, KpiCard, UiPageHeader],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly state = inject(AppState);
  private readonly reports = inject(Reports);
  private readonly orders = inject(Orders);
  private readonly billing = inject(Billing);
  private readonly customers = inject(CustomerService);
  private readonly inventory = inject(Inventory);
  private readonly document = inject(DOCUMENT);

  readonly kpis = computed(() => this.reports.kpis());
  readonly pedidosRecientes = computed(() => this.orders.lista().slice(0, 5));
  readonly facturasPendientes = computed(() => this.billing.lista().filter((f) => f.total > f.pagado).slice(0, 5));
  readonly productosBajoStock = computed(() => this.inventory.bajoStock().slice(0, 5));

  readonly columnasPedidos = signal<any[]>([
    { clave: 'numero', titulo: 'Número', alineacion: 'izquierda' },
    { clave: 'fecha', titulo: 'Fecha', alineacion: 'izquierda' },
    { clave: 'clienteId', titulo: 'Cliente', alineacion: 'izquierda' },
    { clave: 'estado', titulo: 'Estado', alineacion: 'centro' },
    { clave: 'total', titulo: 'Total', alineacion: 'derecha' },
  ]);

  estadoVariante(estado: InvoiceStatus): VarianteBadge {
    switch (estado) {
      case 'pagada': return 'exito';
      case 'anulada': return 'peligro';
      case 'vencida': return 'advertencia';
      case 'emitida': return 'info';
      default: return 'primario';
    }
  }

  clienteNombre(id: string): string {
    const c = this.customers.clientePorId(id);
    return c?.nombre ?? id;
  }

  onFilaClic(pedido: any): void {
    // Navegar al detalle del pedido
  }

  recargar(): void {
    this.document.defaultView?.location.reload();
  }
}