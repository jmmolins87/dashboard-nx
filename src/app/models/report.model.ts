export type ChartType = 'barra' | 'linea' | 'donut' | 'tabla';

export interface ChartPoint {
  etiqueta: string;
  valor: number;
  metadata?: Record<string, unknown>;
}

export interface ChartSeries {
  nombre: string;
  puntos: ChartPoint[];
  color?: string;
}

export interface ReportDataset {
  titulo: string;
  tipo: ChartType;
  series: ChartSeries[];
  total?: number;
  subtitulo?: string;
}

export interface Kpi {
  id: string;
  etiqueta: string;
  valor: string | number;
  tendencia?: 'sube' | 'baja' | 'estable';
  cambioPorcentaje?: number;
  icono?: string;
}

export interface ReportFilters {
  desde: string;
  hasta: string;
  grupo: 'dia' | 'mes' | 'trimestre';
}

export const CHART_COLORS = [
  '#4f46e5',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
];