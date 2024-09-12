import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [appConfig] // Sağlayıcıları buraya ekliyoruz
}).catch(err => console.error(err));


// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient()] // HttpClient'i burada global olarak sağlıyoruz
// });

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
