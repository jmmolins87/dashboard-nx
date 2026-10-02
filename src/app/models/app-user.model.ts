export interface AppUser {
  id: string;
  nombreCompleto: string;
  email: string;
  rol: string;
  iniciales: string;
  ultimoAcceso: string;
  preferencias: AppUserPrefs;
}

export interface AppUserPrefs {
  tema: 'claro' | 'oscuro';
  densidad: 'comoda' | 'compacta';
  moneda: 'EUR' | 'USD';
  notificacionesEmail: boolean;
}

export interface AuthSession {
  user: AppUser;
  token: string;
  expiraEn: number;
}