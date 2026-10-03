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

  barraPorcentaje(p: Product): number {
    if (p.stockMinimo === 0) return 100;
    return Math.min(100, Math.round((p.stock / p.stockMinimo) * 100));
  }
}