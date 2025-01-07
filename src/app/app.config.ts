import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {provideSpinnerConfig} from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),  // Configura il router dell'app con le routes definite in app.routes
    provideHttpClient(withInterceptorsFromDi()),    // Fornisce un client HTTP con supporto per gli interceptor// definiti tramite DI (Dependency Injection)
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, // Registra l'interceptor per la gestione dell'autenticazione nelle richieste HTTP
    provideAnimations(), //Abilita il modulo di animazioni Angular.
    provideToastr({     // Abilita le notifiche grazie alla libreria ngx-toastr
      positionClass: 'toast-top-center',  //posizione della notifica
      progressBar: true,  //Abilia la progressBar
      progressAnimation: 'decreasing',  // Animazione della progress bar
      timeOut: 5000 // Durata della notifica
    }),
    provideSpinnerConfig({type:'ball-clip-rotate'})  // Configura  lo spinner della libreria ngx-Spinner
  ]
};
