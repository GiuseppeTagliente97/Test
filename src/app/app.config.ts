import { ApplicationConfig, effect, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers, reducers } from './store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { delayInterceptor } from './intercept/delay_interceptor';
import { AppEffects } from './store/effect';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(  withInterceptors([delayInterceptor]),),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
              name: 'primeng',
              order: 'app-styles, primeng, another-css-library'
          },
          darkModeSelector: 'null',

      }
    }
    }),
    provideStore(reducers, {metaReducers}),
    provideEffects([
      AppEffects
    ]),
    provideStoreDevtools({
      maxAge:25
    }),
    MessageService,
  ]
};
