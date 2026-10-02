import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { Orders } from './orders';
import { StockMovements } from './stock-movements';
import { Product, ProductFilters, ProductCategory, ProductStatus } from '../models/product.model';

@Service()
export class Inventory {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly orders = inject(Orders);
  private readonly stockMovements = inject(StockMovements);

  readonly cargando = computed(() => this.state.cargandoProductos());

  readonly lista = computed(() => this.state.productosFiltrados());
  readonly bajoStock = computed(() => this.state.productosBajoStock());
  readonly sinStock = computed(() => this.state.productosSinStock());
  readonly stockPorCategoria = computed(() => this.state.stockPorCategoria());

  actualizarFiltros(parcial: Partial<ProductFilters>): void {
    this.state.filtrosProductos.update((f) => ({ ...f, ...parcial }));
  }

  productoPorId(id: string): Product | undefined {
    return this.state.productos().find((p) => p.id === id);
  }

  ajustarStock(productoId: string, delta: number, motivo: string, usuario = 'sistema'): void {
    const producto = this.productoPorId(productoId);
    if (!producto) return;
    producto.stock = Math.max(0, producto.stock + delta);
    this.state.actualizarProducto(producto);
    this.stockMovements.registrar(productoId, delta > 0 ? 'entrada' : 'salida', Math.abs(delta), motivo, usuario);
    this.eventBus.emit('stock-adjusted', { productoId, delta, motivo });
  }

  crearProducto(base: Partial<Product>): Product {
    const nuevo: Product = {
      id: `PRD-NEW-${Date.now()}`,
      sku: `SKU-NEW`,
      nombre: base.nombre ?? '',
      descripcion: base.descripcion ?? '',
      categoria: base.categoria ?? 'ferreteria',
      precio: base.precio ?? 0,
      coste: base.coste ?? 0,
      stock: base.stock ?? 0,
      stockMinimo: base.stockMinimo ?? 5,
      estado: base.estado ?? 'activo',
      proveedor: base.proveedor ?? '',
      ubicacion: base.ubicacion ?? '',
    };
    this.state.productos.update((l) => [nuevo, ...l]);
    return nuevo;
  }

  categorias(): ProductCategory[] {
    return ['ferreteria', 'electricidad', 'fontaneria', 'pintura', 'herramientas', 'jardineria'];
  }

  estados(): ProductStatus[] {
    return ['activo', 'descatalogado', 'sin-stock'];
  }
}