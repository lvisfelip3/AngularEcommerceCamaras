import { ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideClientHydration } from '@angular/platform-browser'; only with SSR

import { InMemoryScrollingFeature, InMemoryScrollingOptions, withInMemoryScrolling } from '@angular/router';
import { fetchErrorInterceptor } from '@shared/interceptors/fetch-error.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      inMemoryScrollingFeature,
      withViewTransitions()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([fetchErrorInterceptor])
    ),
    provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection()
    // provideClientHydration(), only with SSR
  ]
};
