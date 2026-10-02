export interface ApiError {
  codigo: string;
  mensaje: string;
  detalles?: Record<string, string[]>;
  timestamp: string;
}

export function esErrorValidacion(error: ApiError): boolean {
  return error.codigo === 'VALIDATION_ERROR';
}

export function esErrorNoEncontrado(error: ApiError): boolean {
  return error.codigo === 'NOT_FOUND';
}