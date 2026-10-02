export interface ServerConfig {
  version: string;
  entorno: 'desarrollo' | 'staging' | 'produccion';
  mantenimiento: boolean;
  maxSubidaMB: number;
  zonaHoraria: string;
  caracteristicas: {
    informes: boolean;
    apiPublica: boolean;
    sso: boolean;
  };
}

export const SERVER_CONFIG_MOCK: ServerConfig = {
  version: '3.14.159',
  entorno: 'produccion',
  mantenimiento: false,
  maxSubidaMB: 50,
  zonaHoraria: 'Europe/Madrid',
  caracteristicas: {
    informes: true,
    apiPublica: false,
    sso: false,
  },
};