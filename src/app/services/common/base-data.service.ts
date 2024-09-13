import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseDataService {
  private apiUrl?: string;

  constructor(protected httpClient: HttpClient) {}

  // API ve controller bilgilerini dışarıdan alarak ayarlıyoruz
  setApiDetails(api: string, controller: string): void {
    this.apiUrl = `${environment.apiBaseUrl}/${api}/${controller}`;
  }

  // Observable'ı Promise'e dönüştüren yardımcı metod
  protected toPromise<T>(observable: Observable<T>): Promise<T> {
    return firstValueFrom(observable);
  }
  
  // Post request metodu
  protected post<T = any>(method: string, data: any): Promise<T> {
    const url = `${this.apiUrl}/${method}`;
    const headers = new HttpHeaders().set('X-Method-Name', method);
    return this.toPromise(this.httpClient.post<T>(url, data, { headers }));
  }

  // Get request metodu
  protected get<T = any>(method: string, params?: any): Promise<T> {
    const url = `${this.apiUrl}/${method}`;
    return this.toPromise(this.httpClient.get<T>(url, { params }));
  }
}