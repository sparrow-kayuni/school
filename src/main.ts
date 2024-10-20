import { bootstrapApplication, provideProtractorTestingSupport, provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import {routeConfig} from './app/routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient(), provideClientHydration()
  ]
})
  .catch((err) => console.error(err));
