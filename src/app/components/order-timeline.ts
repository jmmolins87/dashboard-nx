import { Component, input } from '@angular/core';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-timeline',
  imports: [],
  templateUrl: './order-timeline.html',
  styleUrl: './order-timeline.scss',
})
export class OrderTimeline {
  readonly pedido = input.required<Order>();
}