import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './services/seo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    { provide: TitleStrategy, useClass: SeoTitleStrategy }
  ]
};
