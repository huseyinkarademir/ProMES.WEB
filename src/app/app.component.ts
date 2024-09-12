import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkOrderComponent } from './pages/work-order/work-order.component';
import { WorkOrderService } from './services/work-order/work-order.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [WorkOrderComponent]
})
export class AppComponent {
  title = 'ProMES.WEB';
  constructor(private workOrderService: WorkOrderService) {}  // Servis burada kullanılabilir
}
