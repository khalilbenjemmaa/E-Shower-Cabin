import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// This now correctly imports AppComponent from the component file.
import { AppComponent } from './app/app.component';

// Old links used hash URLs (/#/product/7). Rewrite them to clean paths
// before the router starts so shared links and bookmarks keep working.
if (window.location.hash.startsWith('#/')) {
  const base = (document.querySelector('base')?.getAttribute('href') ?? '/').replace(/\/$/, '');
  history.replaceState(null, '', base + window.location.hash.slice(1));
}

// This now correctly bootstraps the AppComponent.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
