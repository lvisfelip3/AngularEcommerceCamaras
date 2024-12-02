import { ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideClientHydration } from '@angular/platform-browser'; only with SSR

import { InMemoryScrollingFeature, InMemoryScrollingOptions, withInMemoryScrolling } from '@angular/router';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), inMemoryScrollingFeature),
    provideHttpClient(withFetch()), provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection()
    // provideClientHydration(), only with SSR
  ]
};
