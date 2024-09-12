import { Injectable } from '@angular/core';
import { WorkOrderModel, WorkOrderQueryRequest } from '../../models/work-order/work-order.model';
import { BaseDataService } from '../common/base-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService extends BaseDataService {

  constructor(httpClient: HttpClient) {
    // BaseDataService constructor'ına HttpClient'ı gönderiyoruz
    super(httpClient);
    // 'WorkOrder' API adı ve 'list-workOrders' controller adını burada ayarlıyoruz
    this.setApiDetails('WorkOrder', 'list-workOrders');
  }

  getWorkOrders(req?: WorkOrderQueryRequest): Promise<WorkOrderModel[]> {
    return this.post<WorkOrderModel[]>('GetWorkOrders', req);
  }
}




// import { Injectable } from "@angular/core";
// import { WorkOrderModel, WorkOrderQueryRequest } from "../../models/work-order/work-order.model";
// import { BaseDataService } from "../common/base-data.service";
// import { HttpService } from "../common/http.service";
// // import { HttpClient } from "@angular/common/http";

// @Injectable({
//     providedIn: 'root',
// })
// export class WorkOrderService extends BaseDataService {

//   constructor(override readonly httpService: HttpService) {
//     // BaseDataService constructor'ına api ve controller parametrelerini veriyoruz
//     super(httpService, 'WorkOrder', 'list-workOrders');
//   }
  
//   getWorkOrders(req?: WorkOrderQueryRequest): Promise<WorkOrderModel[]> {
//     return this.post<WorkOrderModel[]>("GetWorkOrders", req)
//   }

//     // getWorkOrders(): WorkOrder[] {
//     //     return this.workOrders;
//     // }

//     // getDowntimeTypes(): number[] {
//     //     const types = new Set<number>();
//     //     for (const order of this.workOrders) {
//     //         for (const downtime of order.downtimes) {
//     //             types.add(downtime.downtimeType);
//     //         }
//     //     }
//     //     return Array.from(types);
//     // }

//     // getDowntimeSumByType(workOrder: WorkOrder, type: number): number {
//     //     return workOrder.downtimes
//     //         .filter(d => d.downtimeType == type)
//     //         .reduce((sum, d) => sum + d.downtimeDuration, 0);
//     // }

//     // getTotalDowntimeSumByType(type: number): number {
//     //     return this.workOrders.reduce((sum, order) => {
//     //         return sum + this.getDowntimeSumByType(order, type);
//     //     }, 0);
//     // }

//     // getTotalDowntimeSum(workOrder: WorkOrder): number {
//     //     return workOrder.downtimes.reduce((sum, d) => sum + d.downtimeDuration, 0);
//     // }
// }