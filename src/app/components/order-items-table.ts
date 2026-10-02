import { Component, input } from '@angular/core';
import { OrderItem } from '../models/order.model';
import { Product } from '../models/product.model';
import { Inventory } from '../services/inventory';

@Component({
  selector: 'app-order-items-table',
  imports: [],
  templateUrl: './order-items-table.html',
  styleUrl: './order-items-table.scss',
})
export class OrderItemsTable {
  readonly items = input.required<OrderItem[]>();
  readonly inventory = input.required<Inventory>();

  protected getProduct(productId: string): Product | undefined {
    return this.inventory().productoPorId(productId);
  }
}