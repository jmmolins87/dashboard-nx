import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { esCifValido, esEmailValido, esIbanValido, esTelefonoValido } from '../../vendor/acme-utils/validation';

export function cifValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return esCifValido(control.value) ? null : { cifInvalido: true };
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return esEmailValido(control.value) ? null : { emailInvalido: true };
  };
}

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return esIbanValido(control.value) ? null : { ibanInvalido: true };
  };
}

export function telefonoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return esTelefonoValido(control.value) ? null : { telefonoInvalido: true };
  };
}

export function noCeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value;
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? null : { noCero: true };
  };
}

export function fechaNoFuturaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const fecha = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha <= hoy ? null : { fechaFutura: true };
  };
}

export function coincidirValidator(otroControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;
    const otro = control.parent.get(otroControlName);
    return otro && control.value === otro.value ? null : { noCoincide: true };
  };
}