import { InjectionToken } from '@angular/core';

export const DEFAULT_LOADING_OPTIONS = new InjectionToken<{
  threshold: number;
}>('loading options', {
  providedIn: 'root',
  factory: () => ({ threshold: 200 }),
});
