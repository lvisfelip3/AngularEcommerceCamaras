import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductItemOrder } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-confirmed-item',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './confirmed-item.component.html',
  styleUrl: './confirmed-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmedItemComponent {
  @Input() item: ProductItemOrder | null = null

  Subtotal() {
    return Number(this.item?.precio) * (this.item?.cantidad ?? 0)
  }
}
