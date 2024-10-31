import { Component } from '@angular/core';
import { StepperComponent } from "./ui/stepper/stepper.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

}
