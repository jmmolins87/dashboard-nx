export function marcarSucio(form: { markAllAsTouched?: () => void; markAsDirty?: () => void }): void {
  if (form.markAllAsTouched) form.markAllAsTouched();
  if (form.markAsDirty) form.markAsDirty();
}

export function valoresCambiados(valores: Record<string, unknown>, originales: Record<string, unknown>): boolean {
  const claves = new Set([...Object.keys(valores), ...Object.keys(originales)]);
  for (const k of claves) {
    const a = valores[k];
    const b = originales[k];
    if (a instanceof Date && b instanceof Date) {
      if (a.getTime() !== b.getTime()) return true;
    } else if (a !== b) {
      return true;
    }
  }
  return false;
}

export function extraerErrores(control: { errors: Record<string, unknown> | null }): string[] {
  if (!control.errors) return [];
  return Object.entries(control.errors).map(([clave, val]) => {
    if (typeof val === 'object' && val !== null && 'requiredLength' in val) {
      return `Mínimo ${val['requiredLength']} caracteres`;
    }
    return clave;
  });
}