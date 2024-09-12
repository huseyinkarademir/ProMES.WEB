import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../services/work-order/work-order.service';
import { WorkOrderModel, WorkOrderQueryRequest } from '../../models/work-order/work-order.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-work-order',
    standalone: true,
    templateUrl: './work-order.component.html',
    imports: [CommonModule],  // HttpClientModule burada kullanılıyor
    providers: [WorkOrderService] // Servisin burada sağlandığından emin olun
})
export class WorkOrderComponent implements OnInit {
    downtimeTypes: string[] = [];
    workOrders: WorkOrderModel[] = [];
    totalDurationsByReason: { [key: string]: number } = {};

    constructor(private workOrderService: WorkOrderService) {}

    ngOnInit(): void {
        this.loadWorkOrders();
        // Duruş tiplerine göre dinamik sütunları belirliyoruz
        this.generateDowntimeColumns();

        // Duruş sürelerini toplamak için tablo altındaki toplamları hesaplıyoruz
        this.calculateTotalDurationsByReason();
    }

    private async loadWorkOrders() {
        try {
            let req = {} as WorkOrderQueryRequest
            this.workOrders = await this.workOrderService.getWorkOrders(req);
        } catch (error) {
            console.error('İş emirleri yüklenirken hata oluştu', error);
        }
      }

      // Dinamik sütun oluşturma: tüm iş emirlerinde geçen duruş türlerini alıyoruz
  generateDowntimeColumns(): void {
    const downtimeTypes = new Set<string>();

    this.workOrders.forEach(order => {
      if (order.downtimeDurations) {
        Object.values(order.downtimeDurations).forEach((downtime: any) => {
          downtimeTypes.add(downtime.reason);
        });
      }
    });

    this.downtimeTypes = Array.from(downtimeTypes);
  }

  // Toplam süreyi her duruş türüne göre hesaplama
  calculateTotalDurationsByReason(): void {
    this.downtimeTypes.forEach(reason => {
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

}