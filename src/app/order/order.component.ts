import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StepperComponent } from "./ui/stepper/stepper.component";
import { OrderSummaryComponent } from "./ui/order-summary/order-summary.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    StepperComponent,
    OrderSummaryComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {

}
