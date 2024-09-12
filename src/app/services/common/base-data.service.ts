import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
      return this.toPromise(this.httpClient.post<T>(url, data));
    }
  
    // Get request metodu
    protected get<T = any>(method: string, params?: any): Promise<T> {
      const url = `${this.apiUrl}/${method}`;
      return this.toPromise(this.httpClient.get<T>(url, { params }));
    }
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// import { HttpHeaders } from '@angular/common/http';
// import { firstValueFrom, Observable } from 'rxjs';
// import { HttpService } from './http.service';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class BaseDataService {
//   private api: string;
//   private controller: string;
//   private readonly headers: HttpHeaders;

//   constructor(private httpService: HttpService, api: string, controller: string) {
//     this.api = api;
//     this.controller = controller;
//     this.headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     });
//   }

// protected toPromise<T>(observable: Observable<T>): Promise<T> {
//     return firstValueFrom(observable); // Observable'ı Promise'e dönüştürüyoruz
//   }

//   protected post<T>(method: string, data: any, responseType: any = 'json', headers: HttpHeaders = this.headers): Promise<T> {
//     const url = this.httpService.getUrl(this.api, this.controller, method);
//     return this.toPromise(this.httpService.httpClient.post<T>(url, data, { headers, responseType }));
//   }

//   protected get<T>(method: string, params?: any, responseType: any = 'json', headers: HttpHeaders = this.headers): Promise<T> {
//     const url = this.httpService.getUrlWithQueryString(this.api, this.controller, method, params);
//     return this.toPromise(this.httpService.httpClient.get<T>(url, { headers, responseType }));
//   }
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// // import { HttpService } from './http.service';
// import { environment } from '../../../environments/environment';
// import { HttpService } from './http.service';

// export class BaseDataService {
//     httpService?: HttpService

//     constructor(httpService: HttpService, api: string, controller: string){};
    
//     // constructor(httpClient: HttpClient, api: string, controller: string) {
//     //     this.apiUrl = `${environment.api.workOrderApi}/${api}`;
//     //     // this.apiUrl = `https://localhost:7178/${api}`;
//     //     this.controller = controller;
//     // }

//     // getUrl(): any;
//     // private buildUrl;
//     // private optionBuilder
//     protected toPromise<T = any>(observable: Observable<T>): Promise<T>
//     protected post<T = any>(method: string, data: any, responseType?: any, headers?: any, useFormData?: boolean): Promise<T>
//     //   protected put<T = any>(method: string, data: any, responseType?: any, useFormData?: any): Promise<T>
//     //   protected get<T = any>(method: string, data?: any, responseType?: any): Promise<T>
//     //   protected delete<T = any>(method: string, data: any, querystring?: boolean): Promise<T>
// }