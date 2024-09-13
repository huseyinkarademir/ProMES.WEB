import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../services/work-order/work-order.service';
import { WorkOrderModel, WorkOrderQueryRequest } from '../../models/work-order/work-order.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-work-order',
    standalone: true,
    templateUrl: './work-order.component.html',
    styleUrl: './work-order.component.css',
    imports: [CommonModule],  // HttpClientModule burada kullanılıyor
    providers: [WorkOrderService] // Servisin burada sağlandığından emin olun
})
export class WorkOrderComponent implements OnInit {
  downtimeColumns: string[] = [];
  workOrders: WorkOrderModel[] = [];
  totalDurationsByReason: { [key: string]: number } = {};

  constructor(private workOrderService: WorkOrderService) {}

  async ngOnInit() {
    await this.loadWorkOrders();
  }

  async loadWorkOrders() {
    try {
        let req = {} as WorkOrderQueryRequest
        const response = await this.workOrderService.getWorkOrders(req);
        this.workOrders = response.workOrderList;
    } catch (error) {
        console.error('İş emirleri yüklenirken hata oluştu', error);
    }

    this.generateDowntimeColumns();
    this.calculateTotalDurationsByReason();
  }

  generateDowntimeColumns(): void {
    if (!this.workOrders || this.workOrders.length === 0) {
      console.error('WorkOrders verisi henüz yüklenmemiş.');
      return; // Eğer veriler yüklenmediyse işlem yapmıyoruz
    }

    const downtimeTypes = new Set<string>();
    this.workOrders.forEach(order => {
      if (order.downtimeDurations) {
        Object.values(order.downtimeDurations).forEach((downtime: any) => {
          downtimeTypes.add(downtime.reason);
        });
      }
    });

    this.downtimeColumns = Array.from(downtimeTypes);
  }

  // Toplam süreyi her duruş türüne göre hesaplama
  calculateTotalDurationsByReason(): void {
    this.downtimeColumns.forEach(reason => {
      this.totalDurationsByReason[reason] = 0;

      this.workOrders.forEach(order => {
        const downtimeDurations = order.downtimeDurations || {};
        Object.values(downtimeDurations).forEach((downtime: any) => {
          if (downtime.reason === reason) {
            this.totalDurationsByReason[reason] += downtime.totalDuration;
          }
        });
      });
    });
  }

  // Her iş emrindeki duruş süresini alma
  getDowntimeDuration(order: any, reason: string): number {
    const durations = order.downtimeDurations || {};
    for (let key in durations) {
      if (durations[key].reason === reason) {
        return durations[key].totalDuration;
      }
    }
    return 0; // Eğer o duruş türü iş emrinde yoksa 0 döner
  }

  // Genel toplam hesaplama
  getTotalDowntimeForOrder(order: any): number {
    return Object.values(order.downtimeDurations || {}).reduce((sum: number, downtime: any) => {
      return sum + downtime.totalDuration;
    }, 0);
  }

  // Genel toplam satırı
  getTotalForReason(reason: string): number {
    return this.totalDurationsByReason[reason] || 0;
  }

  getOverallTotalDowntime(): number {
    return this.workOrders.reduce((sum, wo) => sum + (wo.totalDowntimeDuration || 0), 0);
  }

}