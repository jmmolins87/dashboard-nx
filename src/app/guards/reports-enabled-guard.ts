import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Settings } from '../services/settings';

export const reportsEnabledGuard: CanActivateFn = () => {
  const settings = inject(Settings);
  return settings.informesHabilitados();
};