const PATRON_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PATRON_CIF = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;
const PATRON_NIF = /^\d{8}[A-HJ-NP-TV-Z]$/;
const PATRON_IBAN_ES = /^ES\d{22}$/;
const PATRON_TELEFONO = /^(\+34[\s-]?)?[6789]\d{8}$/;
const PATRON_CP = /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

export function esEmailValido(valor: string): boolean {
  return PATRON_EMAIL.test(valor.trim());
}

export function esCifValido(valor: string): boolean {
  const limpio = valor.replace(/[\s.-]/g, '').toUpperCase();
  return PATRON_CIF.test(limpio) || PATRON_NIF.test(limpio);
}

export function esIbanValido(valor: string): boolean {
  const limpio = valor.replace(/[\s.-]/g, '').toUpperCase();
  return PATRON_IBAN_ES.test(limpio);
}

export function esTelefonoValido(valor: string): boolean {
  return PATRON_TELEFONO.test(valor.replace(/[\s-]/g, ''));
}

export function esCodigoPostalValido(valor: string): boolean {
  return PATRON_CP.test(valor.trim());
}

export function esPositivo(valor: number): boolean {
  return Number.isFinite(valor) && valor > 0;
}

export function esEntero(valor: number): boolean {
  return Number.isFinite(valor) && Number.isInteger(valor);
}

export function validarNoVacio(valor: string | null | undefined): boolean {
  return valor !== null && valor !== undefined && valor.trim().length > 0;
}
