import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductItemCart } from '@shared/interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemComponent {
  product = input.required<ProductItemCart>();
}
