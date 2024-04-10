import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { reducers } from './store';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/userData/user.effect';

export const appConfig: ApplicationConfig = {


  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(), provideHttpClient(withFetch()), 
    provideToastr({
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
      easing: 'ease-in',
      toastClass: 'ngx-toastr',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideStore(reducers),
    provideEffects([UserEffects]),
    provideAnimations()
  ]
};
