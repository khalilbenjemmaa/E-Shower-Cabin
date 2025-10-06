import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // I've removed the invalid provider. This is the correct basic configuration.
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
