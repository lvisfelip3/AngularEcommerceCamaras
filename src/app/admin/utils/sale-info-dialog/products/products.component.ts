import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductItemOrder } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
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
