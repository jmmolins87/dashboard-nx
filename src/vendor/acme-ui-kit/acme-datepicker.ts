import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DIAS_SEMANA, MESES_LARGOS, formatearFecha } from '../acme-utils/dates';

@Component({
  selector: 'acme-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './acme-datepicker.html',
  styleUrl: './acme-datepicker.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AcmeDatepicker), multi: true },
  ],
})
export class AcmeDatepicker implements ControlValueAccessor {
  readonly etiqueta = input<string>('');
  readonly placeholder = input<string>('dd/mm/aaaa');
  readonly minimo = input<string>('');
  readonly deshabilitado = input(false);

  protected readonly abierto = signal(false);
  protected readonly valor = signal<string | null>(null);
  protected readonly anioVisible = signal(2026);
  protected readonly mesVisible = signal(8);

  private onChange: (valor: string | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private internoDeshabilitado = false;

  writeValue(valor: string | null): void {
    this.valor.set(valor ?? null);
    if (valor) {
      const d = new Date(valor);
      if (!Number.isNaN(d.getTime())) {
        this.anioVisible.set(d.getUTCFullYear());
        this.mesVisible.set(d.getUTCMonth());
      }
    }
  }

  registerOnChange(fn: (valor: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(deshabilitado: boolean): void {
    this.internoDeshabilitado = deshabilitado;
  }

  protected get bloqueado(): boolean {
    return this.deshabilitado() || this.internoDeshabilitado;
  }

  protected alternar(): void {
    if (this.bloqueado) return;
    this.abierto.update((a) => !a);
    if (this.abierto()) {
      const actual = this.valor() ? new Date(this.valor()!) : null;
      const base = actual && !Number.isNaN(actual.getTime()) ? actual : new Date(this.minimo() || 0);
      if (!Number.isNaN(base.getTime())) {
        this.anioVisible.set(base.getUTCFullYear());
        this.mesVisible.set(base.getUTCMonth());
      }
    }
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  protected mesAnterior(): void {
    let mes = this.mesVisible() - 1;
    let anio = this.anioVisible();
    if (mes < 0) {
      mes = 11;
      anio--;
    }
    this.mesVisible.set(mes);
    this.anioVisible.set(anio);
  }

  protected mesSiguiente(): void {
    let mes = this.mesVisible() + 1;
    let anio = this.anioVisible();
    if (mes > 11) {
      mes = 0;
      anio++;
    }
    this.mesVisible.set(mes);
    this.anioVisible.set(anio);
  }

  protected readonly cabecera = () => `${MESES_LARGOS[this.mesVisible()]} ${this.anioVisible()}`;

  protected obtenerDia(iso: string): number {
    return new Date(iso).getUTCDate();
  }

  protected readonly dias = (): (string | null)[] => {
    const anio = this.anioVisible();
    const mes = this.mesVisible();
    const primerDia = new Date(Date.UTC(anio, mes, 1));
    const total = new Date(Date.UTC(anio, mes + 1, 0)).getUTCDate();
    const offset = (primerDia.getUTCDay() + 6) % 7;
    const celdas: (string | null)[] = Array.from({ length: offset }, () => null);
    for (let d = 1; d <= total; d++) {
      celdas.push(`${anio}-${this.dos(mes + 1)}-${this.dos(d)}`);
    }
    return celdas;
  };

  protected seleccionar(iso: string): void {
    this.valor.set(iso);
    this.onChange(iso);
    this.onTouched();
    this.cerrar();
  }

  protected limpiar(): void {
    this.valor.set(null);
    this.onChange(null);
    this.onTouched();
    this.cerrar();
  }

  protected estaSeleccionado(iso: string): boolean {
    return this.valor() === iso;
  }

  protected esHoy(iso: string): boolean {
    return this.minimo() === iso;
  }

  protected textoValor(): string {
    const v = this.valor();
    return v ? formatearFecha(v, 'corto') : '';
  }

  protected readonly diasSemana = DIAS_SEMANA;

  private dos(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}
