import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StepperComponent } from "./ui/stepper/stepper.component";
import { OrderSummaryComponent } from "./ui/order-summary/order-summary.component";
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { ErrorConexionComponent } from '@shared/components/error-conexion/error-conexion.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    StepperComponent,
    OrderSummaryComponent,
    ErrorConexionComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  private readonly baseService = inject(BaseHttpService);

  isError = computed(() => this.baseService.isError());
}
