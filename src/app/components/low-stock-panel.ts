import { Component, input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-low-stock-panel',
  imports: [],
  templateUrl: './low-stock-panel.html',
  styleUrl: './low-stock-panel.scss',
})
export class LowStockPanel {
  readonly productos = input.required<Product[]>();
}