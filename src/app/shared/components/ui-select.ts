import { Component, input, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ui-select',
  templateUrl: './ui-select.html',
  styleUrl: './ui-select.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiSelect), multi: true },
  ],
})
export class UiSelect implements ControlValueAccessor {
  readonly etiqueta = input<string>('');
  readonly placeholder = input<string>('');
  readonly opciones = input<readonly { valor: string; etiqueta: string }[]>([]);
  readonly deshabilitado = input(false);
  readonly error = input<string>('');
  readonly requerido = input(false);
  readonly id = input<string>('');
  private _valor = signal<string>('');
  private _deshabilitado = signal(false);

  private onChange = (v: string) => {};
  private onTouched = () => {};

  writeValue(v: string): void {
    this._valor.set(v ?? '');
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(d: boolean): void {
    this._deshabilitado.set(d);
  }

  protected onChangeSelect(e: Event): void {
    const v = (e.target as HTMLSelectElement).value;
    this._valor.set(v);
    this.onChange(v);
    this.onTouched();
  }

  protected onBlur(): void {
    this.onTouched();
  }
}