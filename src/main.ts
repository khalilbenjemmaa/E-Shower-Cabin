import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// This now correctly imports AppComponent from the component file.
import { AppComponent } from './app/app.component';

// This now correctly bootstraps the AppComponent.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
