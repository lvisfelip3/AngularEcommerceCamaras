import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductItemOrder } from "@shared/interfaces/interfaces";
import { ConfirmedItemComponent } from "@order/ui/confirmed-item/confirmed-item.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-data',
  standalone: true,
  imports: [
    ConfirmedItemComponent,
    CurrencyPipe
  ],
  templateUrl: './products-data.component.html',
  styleUrl: './products-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsDataComponent {

  @Input() products: ProductItemOrder[] = [];

  Total() {
    let total = 0
    this.products.forEach(item => {
      if (!item) return
      const subtotal = Number(item.precio) * (item.cantidad ?? 0)
      total += subtotal
    })
    return total
  }
}
