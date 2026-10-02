import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { Orders } from './orders';
import { Billing } from './billing';
import { CustomerService } from './customers';
import { Inventory } from './inventory';
import { OrderCalculations } from './order-calculations';
import { CsvExport } from './csv-export';
import {
  ReportDataset,
  ChartSeries,
  ChartPoint,
  Kpi,
  ChartType,
  ReportFilters,
  CHART_COLORS,
} from '../models/report.model';
import { Invoice, InvoiceStatus } from '../models/invoice.model';
import { Order, OrderStatus } from '../models/order.model';
import { Product } from '../models/product.model';
import { Customer } from '../models/customer.model';

@Service()
export class Reports {
  private readonly state = inject(AppState);
  private readonly orders = inject(Orders);
  private readonly billing = inject(Billing);
  private readonly customers = inject(CustomerService);
  private readonly inventory = inject(Inventory);
  private readonly calc = inject(OrderCalculations);
  private readonly csv = inject(CsvExport);

  readonly cargando = signal(false);

  readonly kpis = computed((): Kpi[] => {
    const pedidos = this.orders.lista();
    const facturas = this.billing.lista();
    const clientes = this.customers.lista();
    const productos = this.inventory.lista();
    const pendientes = facturas.filter((f) => f.total > f.pagado).reduce((s, f) => s + f.total - f.pagado, 0);
    const totalVentas = facturas.filter((f) => f.estado === 'pagada').reduce((s, f) => s + f.total, 0);
    return [
      { id: 'kpi-pedidos', etiqueta: 'Pedidos activos', valor: pedidos.length, tendencia: 'sube', cambioPorcentaje: 12, icono: '📦' },
      { id: 'kpi-facturas', etiqueta: 'Pendiente cobro', valor: pendientes.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }), tendencia: 'baja', cambioPorcentaje: -3, icono: '💰' },
      { id: 'kpi-clientes', etiqueta: 'Clientes activos', valor: clientes.filter((c) => c.estado === 'activo').length, tendencia: 'estable', icono: '👥' },
      { id: 'kpi-stock', etiqueta: 'Productos bajo stock', valor: productos.filter((p) => p.stock <= p.stockMinimo).length, tendencia: 'sube', cambioPorcentaje: 8, icono: '⚠️' },
      { id: 'kpi-ventas', etiqueta: 'Ventas mes', valor: totalVentas.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }), tendencia: 'sube', cambioPorcentaje: 15, icono: '📈' },
    ];
  });

  ventasPorMes(filtros?: ReportFilters): ReportDataset {
    const facturas = this.billing.lista().filter((f) => f.estado !== 'anulada');
    const desde = filtros?.desde ? new Date(filtros.desde) : new Date(Date.now() - 365 * 86400000);
    const hasta = filtros?.hasta ? new Date(filtros.hasta) : new Date();
    const grupo = filtros?.grupo ?? 'mes';
    const mapa = new Map<string, number>();
    for (const f of facturas) {
      const fecha = new Date(f.fechaEmision);
      if (fecha < desde || fecha > hasta) continue;
      let clave: string;
      if (grupo === 'dia') clave = fecha.toISOString().slice(0, 10);
      else if (grupo === 'trimestre') {
        const t = Math.floor(fecha.getMonth() / 3) + 1;
        clave = `${fecha.getFullYear()}-T${t}`;
      } else clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      mapa.set(clave, (mapa.get(clave) ?? 0) + f.total);
    }
    const puntos: ChartPoint[] = Array.from(mapa.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([etiqueta, valor]) => ({ etiqueta, valor: Math.round(valor * 100) / 100 }));
    return { titulo: 'Ventas por periodo', tipo: 'barra', series: [{ nombre: 'Ventas', puntos, color: CHART_COLORS[0] }], total: puntos.reduce((s, p) => s + p.valor, 0) };
  }

  topClientes(n = 10): ReportDataset {
    const facturas = this.billing.lista().filter((f) => f.estado === 'pagada');
    const mapa = new Map<string, { cliente: string; total: number }>();
    for (const f of facturas) {
      const c = this.customers.clientePorId(f.clienteId);
      if (!c) continue;
      const entry = mapa.get(c.id);
      if (entry) entry.total += f.total;
      else mapa.set(c.id, { cliente: c.nombre, total: f.total });
    }
    const puntos: ChartPoint[] = Array.from(mapa.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, n)
      .map((e) => ({ etiqueta: e.cliente, valor: Math.round(e.total * 100) / 100 }));
    return { titulo: `Top ${n} clientes`, tipo: 'barra', series: [{ nombre: 'Facturado', puntos, color: CHART_COLORS[1] }], total: puntos.reduce((s, p) => s + p.valor, 0) };
  }

  margenesPorCategoria(): ReportDataset {
    const pedidos = this.orders.lista();
    const mapa = new Map<string, { ingresos: number; coste: number }>();
    for (const p of pedidos) {
      for (const item of p.items) {
        const prod = this.inventory.productoPorId(item.productoId);
        if (!prod) continue;
        const cat = prod.categoria;
        const entry = mapa.get(cat) ?? { ingresos: 0, coste: 0 };
        const ingresos = item.cantidad * item.precioUnitario * (1 - item.descuento / 100);
        entry.ingresos += ingresos;
        entry.coste += item.cantidad * prod.coste;
        mapa.set(cat, entry);
      }
    }
    const series: ChartSeries = {
      nombre: 'Margen %',
      puntos: Array.from(mapa.entries()).map(([cat, v]) => ({
        etiqueta: cat,
        valor: v.ingresos > 0 ? Math.round(((v.ingresos - v.coste) / v.ingresos) * 10000) / 100 : 0,
      })),
    };
    return { titulo: 'Margen por categoría', tipo: 'barra', series: [series] };
  }

  estadoStock(): ReportDataset {
    const productos = this.inventory.lista();
    const categorias = ['ferreteria', 'electricidad', 'fontaneria', 'pintura', 'herramientas', 'jardineria'];
    const puntos: ChartPoint[] = categorias.map((cat) => {
      const items = productos.filter((p) => p.categoria === cat);
      const total = items.reduce((s, p) => s + p.stock, 0);
      return { etiqueta: cat, valor: total };
    });
    return { titulo: 'Stock por categoría', tipo: 'donut', series: [{ nombre: 'Unidades', puntos, color: CHART_COLORS[2] }] };
  }

  resumenTabla(filtros?: ReportFilters): { cabeceras: string[]; filas: (string | number)[][] } {
    const facturas = this.billing.lista().filter((f) => f.estado !== 'anulada');
    const desde = filtros?.desde ? new Date(filtros.desde) : new Date(0);
    const hasta = filtros?.hasta ? new Date() : new Date(8640000000000000);
    const grupo = filtros?.grupo ?? 'mes';
    const mapa = new Map<string, { facturas: number; total: number; pagado: number; pendiente: number }>();
    for (const f of facturas) {
      const fecha = new Date(f.fechaEmision);
      if (fecha < desde || fecha > hasta) continue;
      let clave: string;
      if (grupo === 'dia') clave = fecha.toISOString().slice(0, 10);
      else if (grupo === 'trimestre') {
        const t = Math.floor(fecha.getMonth() / 3) + 1;
        clave = `${fecha.getFullYear()}-T${t}`;
      } else clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      const e = mapa.get(clave) ?? { facturas: 0, total: 0, pagado: 0, pendiente: 0 };
      e.facturas++;
      e.total += f.total;
      e.pagado += f.pagado;
      e.pendiente += Math.max(0, f.total - f.pagado);
      mapa.set(clave, e);
    }
    const cabeceras = ['Periodo', 'Facturas', 'Total', 'Pagado', 'Pendiente'];
    const filas = Array.from(mapa.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([periodo, v]) => [periodo, v.facturas, v.total, v.pagado, v.pendiente]);
    return { cabeceras, filas };
  }

  exportarCSV(dataset: ReportDataset): void {
    this.csv.exportar(dataset.titulo, dataset.series[0].puntos.map((p) => [p.etiqueta, p.valor]), ['Etiqueta', 'Valor']);
  }
}