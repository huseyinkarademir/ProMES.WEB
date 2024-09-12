import { provideRouter, Routes } from '@angular/router';
import { WorkOrderComponent } from './pages/work-order/work-order.component';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'; // Angular 16 ve sonrası

export const routes: Routes = [
  {
    path: '',
    component: WorkOrderComponent
  },
  {
    path: 'work-order',
    component: WorkOrderComponent
  }
];

export const appConfig = [
  provideRouter(routes),
  provideHttpClient(
    withInterceptorsFromDi() // Interceptor'ları Dependency Injection'dan sağlıyoruz
  )
];

export const appProviders = [
  provideHttpClient(
    withInterceptors([
      // Buraya interceptor ekleyebilirsiniz
    ])
  )
];
