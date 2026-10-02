export interface AppPreferences {
  tema: 'claro' | 'oscuro';
  densidad: 'comoda' | 'compacta';
  moneda: 'EUR' | 'USD' | 'GBP';
  formatoFecha: 'corto' | 'medio' | 'largo' | 'iso';
  idioma: 'es' | 'en';
  informesHabilitados: boolean;
  notificacionesEmail: boolean;
  notificacionesPush: boolean;
  autoGuardar: boolean;
}

export const PREFERENCIAS_INICIALES: AppPreferences = {
  tema: 'claro',
  densidad: 'comoda',
  moneda: 'EUR',
  formatoFecha: 'corto',
  idioma: 'es',
  informesHabilitados: true,
  notificacionesEmail: true,
  notificacionesPush: false,
  autoGuardar: true,
};

export type ThemeMode = 'claro' | 'oscuro';
export type DensityMode = 'comoda' | 'compacta';