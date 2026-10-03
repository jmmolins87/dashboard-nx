import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../services/orders';
import { CustomerService as Customers } from '../services/customers';
import { Billing } from '../services/billing';
import { Inventory } from '../services/inventory';
import { Notifications } from '../services/notifications';
import { Dialog } from '../services/dialog';
import { UiPageHeader } from '../shared/components/ui-page-header';
import { UiCard } from '../shared/components/ui-card';
import { UiBadge } from '../shared/components/ui-badge';
import { VarianteBadge } from '../shared';
import { OrderSummaryCard } from '../components/order-summary-card';
import { OrderItemsTable } from '../components/order-items-table';
import { OrderTimeline } from '../components/order-timeline';
import { OrderCancelDialog } from '../components/order-cancel-dialog';
import { Order, OrderStatus } from '../models/order.model';
import { InvoiceStatus } from '../models/invoice.model';
import { StatusLabelPipe } from '../pipes/status-label-pipe';

@Component({
  selector: 'app-order-detail-page',
  imports: [CommonModule, UiPageHeader, UiCard, UiBadge, OrderSummaryCard, OrderItemsTable, OrderTimeline, OrderCancelDialog, StatusLabelPipe],
  templateUrl: './order-detail-page.html',
  styleUrl: './order-detail-page.scss',
})
export class OrderDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly orders = inject(Orders);
  private readonly customers = inject(Customers);
  private readonly billing = inject(Billing);
  private readonly inventory = inject(Inventory);
  private readonly notifications = inject(Notifications);
  private readonly dialog = inject(Dialog);

  readonly id = signal('');
  readonly pedido = computed(() => this.orders.obtenerPedido(this.id()));
  readonly cliente = computed(() => this.customers.clientePorId(this.pedido()?.clienteId ?? ''));
  readonly facturas = computed(() => this.billing.facturasFiltradasPorCliente(this.cliente()?.id ?? ''));
  readonly mostrarCancelar = signal(false);
  readonly cancelarMotivo = signal('');

  ngOnInit(): void {
    this.id.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  cancelar(): void {
    if (!this.cancelarMotivo()) return;
    this.orders.cancelarPedido(this.id(), this.cancelarMotivo());
    this.notifications.exito('Pedido cancelado', `El pedido ${this.pedido()?.numero} ha sido cancelado`);
    this.mostrarCancelar.set(false);
    this.cancelarMotivo.set('');
  }

  estadoVariante(estado: OrderStatus | InvoiceStatus): VarianteBadge {
    switch (estado) {
      case 'entregado': return 'exito' as VarianteBadge;
      case 'cancelado': return 'peligro' as VarianteBadge;
      case 'enviado': return 'info' as VarianteBadge;
      case 'preparacion': return 'advertencia' as VarianteBadge;
      case 'confirmado': return 'secundario' as VarianteBadge;
      case 'pagada': return 'exito' as VarianteBadge;
      case 'anulada': return 'peligro' as VarianteBadge;
      case 'vencida': return 'advertencia' as VarianteBadge;
      default: return 'primario' as VarianteBadge;
    }
  }
}
