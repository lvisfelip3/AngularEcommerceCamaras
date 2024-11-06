import { ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideClientHydration } from '@angular/platform-browser'; only with SSR

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()), provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
    // provideClientHydration(), only with SSR
  ]
};
