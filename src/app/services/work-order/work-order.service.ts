import { Injectable } from '@angular/core';
import { WorkOrderListModel, WorkOrderQueryRequest } from '../../models/work-order/work-order.model';
import { BaseDataService } from '../common/base-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService extends BaseDataService {

  constructor(protected override httpClient: HttpClient) {
    // BaseDataService constructor'ına HttpClient'ı gönderiyoruz
    super(httpClient);
    // 'WorkOrder' API adı ve 'list-workOrders' controller adını burada ayarlıyoruz
    this.setApiDetails('WorkOrder', 'list-workOrders');
  }

  getWorkOrders(req?: WorkOrderQueryRequest): Promise<WorkOrderListModel> {
    return this.post<WorkOrderListModel>('GetWorkOrders', req);
  }
}