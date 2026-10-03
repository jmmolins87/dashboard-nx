import { Component, input, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiInput), multi: true },
  ],
})
export class UiInput implements ControlValueAccessor {
  readonly etiqueta = input<string>('');
  readonly placeholder = input<string>('');
  readonly tipo = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>('text');
  readonly deshabilitado = input(false);
  readonly error = input<string>('');
  readonly requerido = input(false);
  readonly id = input<string>('');
  readonly name = input<string>('');
  private _valor = signal<string>('');
  private _deshabilitado = signal(false);

  get valor(): string {
    return this._valor();
  }

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

  protected onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this._valor.set(v);
    this.onChange(v);
    this.onTouched();
  }

  protected onBlur(): void {
    this.onTouched();
  }
}