import { Component, input } from '@angular/core';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-summary-card',
  imports: [],
  templateUrl: './order-summary-card.html',
  styleUrl: './order-summary-card.scss',
})
export class OrderSummaryCard {
  readonly pedido = input.required<Order>();
}