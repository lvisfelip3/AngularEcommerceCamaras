import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [],
  template: `
  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
    {{ getStockMessage() }}
  </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStockComponent {
  readonly stock = input.required<number>()

  getStockMessage(): string {
    const stockValue = this.stock();

    if (stockValue <= 0) {
      return 'Sin stock';
    } else if (stockValue >= 500) {
      return '+500 unidades disponibles';
    } else if (stockValue >= 200) {
      return '+200 unidades disponibles';
    } else if (stockValue >= 100) {
      return '+100 unidades disponibles';
    } else if (stockValue >= 50) {
      return '+50 unidades disponibles';
    } else if (stockValue >= 30) {
      return '+30 unidades disponibles';
    } else if (stockValue >= 20) {
      return '+20 unidades disponibles';
    } else if (stockValue >= 10) {
      return '+10 unidades disponibles';
    } else if (stockValue <= 10) {
      return 'Pocas unidades';
    }

    return '';
  }
}
