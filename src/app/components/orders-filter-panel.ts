import { Component, input } from '@angular/core';
import { Customer } from '../models/customer.model';
import { OrderFilters, OrderStatus } from '../models/order.model';

@Component({
  selector: 'app-orders-filter-panel',
  imports: [],
  templateUrl: './orders-filter-panel.html',
  styleUrl: './orders-filter-panel.scss',
})
export class OrdersFilterPanel {
  readonly clientes = input.required<Customer[]>();
  readonly filtros = input.required<OrderFilters>();
}