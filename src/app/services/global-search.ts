import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { CustomerService } from './customers';
import { Orders } from './orders';
import { Billing } from './billing';
import { Inventory } from './inventory';
import { normalizar } from '../../vendor/acme-utils/text';
import { SearchResult, SearchCategory } from '../models/search.model';
import { Order } from '../models/order.model';
import { Invoice } from '../models/invoice.model';
import { Product } from '../models/product.model';

@Service()
export class GlobalSearch {
  private readonly state = inject(AppState);
  private readonly customers = inject(CustomerService);
  private readonly orders = inject(Orders);
  private readonly billing = inject(Billing);
  private readonly inventory = inject(Inventory);

  buscar(texto: string, max = 10): SearchResult[] {
    if (!texto || texto.trim().length < 2) return [];
    const term = normalizar(texto);
    const resultados: SearchResult[] = [];

    // Clientes
    for (const c of this.customers.lista().slice(0, max)) {
      const hay = [c.nombre, c.codigo, c.email, c.cif].some((v) => normalizar(v).includes(term));
      if (hay) {
        resultados.push({
          id: c.id,
          categoria: 'clientes',
          titulo: c.nombre,
          subtitulo: `${c.codigo} · ${c.segmento}`,
          url: `/clientes/${c.id}`,
          icono: '👤',
        });
      }
    }

    // Pedidos
    for (const p of this.orders.lista().slice(0, max)) {
      const hay = [p.numero, p.clienteId, p.notas].some((v) => normalizar(v).includes(term));
      if (hay) {
        resultados.push({
          id: p.id,
          categoria: 'pedidos',
          titulo: p.numero,
          subtitulo: `Estado: ${p.estado} · ${this.clienteNombre(p.clienteId)}`,
          url: `/pedidos/${p.id}`,
          icono: '📦',
        });
      }
    }

    // Facturas
    for (const f of this.billing.lista().slice(0, max)) {
      const hay = [f.numero, f.clienteId].some((v) => normalizar(v).includes(term));
      if (hay) {
        resultados.push({
          id: f.id,
          categoria: 'facturas',
          titulo: f.numero,
          subtitulo: `${f.total.toFixed(2)} € · ${f.estado}`,
          url: `/facturacion/${f.id}`,
          icono: '🧾',
        });
      }
    }

    // Productos
    for (const p of this.inventory.lista().slice(0, max)) {
      const hay = [p.nombre, p.sku, p.descripcion].some((v) => normalizar(v).includes(term));
      if (hay) {
        resultados.push({
          id: p.id,
          categoria: 'productos',
          titulo: p.nombre,
          subtitulo: `${p.sku} · Stock: ${p.stock}`,
          url: `/inventario/${p.id}`,
          icono: '📦',
        });
      }
    }

    return resultados.slice(0, max);
  }

  private clienteNombre(id: string): string {
    return this.customers.clienteNombre(id);
  }
}