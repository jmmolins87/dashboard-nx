import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../services/orders';
import { CustomerService as Customers } from '../services/customers';
import { Inventory } from '../services/inventory';
import { Notifications } from '../services/notifications';
import { UiPageHeader } from '../shared/components/ui-page-header';
import { UiCard } from '../shared/components/ui-card';
import { UiButton } from '../shared/components/ui-button';
import { UiInput } from '../shared/components/ui-input';
import { UiSelect } from '../shared/components/ui-select';
import { UiBadge } from '../shared/components/ui-badge';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order.model';
import { OrderStatus, OrderPriority } from '../models/order.model';
import { UiSkeleton } from '../shared/components/ui-skeleton';
import { UiEmptyState } from '../shared/components/ui-empty-state';

@Component({
  selector: 'app-order-edit-page',
  imports: [CommonModule, FormsModule, UiPageHeader, UiCard, UiButton, UiInput, UiSelect, UiBadge, UiSkeleton, UiEmptyState],
  templateUrl: './order-edit-page.html',
  styleUrl: './order-edit-page.scss',
})
export class OrderEditPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly orders = inject(Orders);
  private readonly customers = inject(Customers);
  private readonly inventory = inject(Inventory);
  private readonly notifications = inject(Notifications);

  readonly id = signal('');
  readonly pedido = computed(() => this.orders.obtenerPedido(this.id()));
  readonly clientes = computed(() => this.customers.lista());
  readonly productos = computed(() => this.inventory.lista().filter((p) => p.estado === 'activo'));

  readonly form = signal<Partial<Order>>({});
  readonly guardando = signal(false);
  readonly hayCambios = signal(false);

  ngOnInit(): void {
    this.id.set(this.route.snapshot.paramMap.get('id') ?? '');
    const p = this.pedido();
    if (p) this.form.set({ ...p });
  }

  ngOnDestroy(): void {}

  guardar(): void {
    this.guardando.set(true);
    setTimeout(() => {
      this.orders.actualizarPedido(this.form() as Order);
      this.notifications.exito('Pedido actualizado', 'Los cambios se han guardado correctamente');
      this.hayCambios.set(false);
      this.guardando.set(false);
      this.router.navigate(['/pedidos', this.id()]);
    }, 400);
  }

  cancelar(): void {
    this.router.navigate(['/pedidos', this.id()]);
  }

  estados: OrderStatus[] = ['borrador', 'confirmado', 'preparacion', 'enviado', 'entregado', 'cancelado'];
  prioridades: OrderPriority[] = ['baja', 'media', 'alta'];
}
