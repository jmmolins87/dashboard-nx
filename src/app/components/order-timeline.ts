import { Component, input } from '@angular/core';
import { Order } from '../models/order.model';
import { DateDisplayPipe } from '../pipes/date-display-pipe';
import { StatusLabelPipe } from '../pipes/status-label-pipe';

@Component({
  selector: 'app-order-timeline',
  imports: [DateDisplayPipe, StatusLabelPipe],
  templateUrl: './order-timeline.html',
  styleUrl: './order-timeline.scss',
})
export class OrderTimeline {
  readonly pedido = input.required<Order>();
}