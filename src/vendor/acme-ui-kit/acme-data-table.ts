import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export interface AcmeColumna {
  clave: string;
  titulo: string;
  alineacion?: 'izquierda' | 'derecha' | 'centro';
  ancho?: string;
}

export type FormateadorCelda = (valor: unknown, fila: Record<string, unknown>) => string;

@Component({
  selector: 'acme-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './acme-data-table.html',
  styleUrl: './acme-data-table.scss',
})
export class AcmeDataTable {
  readonly columnas = input.required<AcmeColumna[]>();
  readonly filas = input.required<Record<string, unknown>[]>();
  readonly formateadores = input<Record<string, FormateadorCelda>>({});
  readonly conPaginacion = input(true);
  readonly pagina = input(1);
  readonly paginaTamano = input(10);
  readonly cargando = input(false);
  readonly mensajeVacio = input('Sin resultados');
  readonly resaltado = input<string>('');

  readonly paginaCambia = output<number>();
  readonly filaClic = output<Record<string, unknown>>();
  readonly ordenCambia = output<{ clave: string; direccion: 'asc' | 'desc' }>();

  readonly claveOrden = signal<string | null>(null);
  readonly direccionOrden = signal<'asc' | 'desc'>('asc');
  readonly paginaInterna = signal(1);

  readonly filasOrdenadas = computed(() => {
    const clave = this.claveOrden();
    const filas = this.filas();
    if (!clave) return filas;
    const dir = this.direccionOrden() === 'asc' ? 1 : -1;
    return [...filas].sort((a, b) => {
      const va = a[clave];
      const vb = b[clave];
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va ?? '').localeCompare(String(vb ?? ''), 'es') * dir;
    });
  });

  readonly totalPaginas = computed(() => {
    const tam = this.paginaTamano();
    if (tam <= 0) return 1;
    return Math.max(1, Math.ceil(this.filasOrdenadas().length / tam));
  });

  readonly paginaActual = computed(() => Math.min(this.paginaInterna(), this.totalPaginas()));

  readonly filasVisibles = computed(() => {
    if (!this.conPaginacion()) return this.filasOrdenadas();
    const inicio = (this.paginaActual() - 1) * this.paginaTamano();
    return this.filasOrdenadas().slice(inicio, inicio + this.paginaTamano());
  });

  readonly vacio = computed(() => this.filasVisibles().length === 0 && !this.cargando());

  cambiarOrden(clave: string): void {
    if (this.claveOrden() === clave) {
      this.direccionOrden.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.claveOrden.set(clave);
      this.direccionOrden.set('asc');
    }
    this.paginaInterna.set(1);
    this.ordenCambia.emit({ clave: this.claveOrden()!, direccion: this.direccionOrden() });
  }

  irAPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas() || p === this.paginaActual()) return;
    this.paginaInterna.set(p);
    this.paginaCambia.emit(p);
  }

  celda(fila: Record<string, unknown>, col: AcmeColumna): string {
    const formateador = this.formateadores()[col.clave];
    if (formateador) return formateador(fila[col.clave], fila);
    return fila[col.clave] === null || fila[col.clave] === undefined ? '—' : String(fila[col.clave]);
  }

  coincideResaltado(texto: unknown): boolean {
    const term = this.resaltado();
    if (!term || texto === null || texto === undefined) return false;
    return String(texto).toLowerCase().includes(term.toLowerCase());
  }

  protected readonly rangoPaginas = computed(() => {
    const total = this.totalPaginas();
    const actual = this.paginaActual();
    const inicio = Math.max(1, Math.min(actual - 2, total - 4));
    const fin = Math.min(total, inicio + 4);
    const paginas: number[] = [];
    for (let i = inicio; i <= fin; i++) paginas.push(i);
    return paginas;
  });
}
