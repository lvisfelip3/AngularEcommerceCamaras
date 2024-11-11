import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@shared/interfaces/interfaces';

@Pipe({
  name: 'sortProducts',
  standalone: true
})
export class SortProductsPipe implements PipeTransform {

  transform(products: Product[], orderBy: string | null): Product[] {
    if (!products || !orderBy) {
      return products;
    }

    switch (orderBy) {
      case 'precioAsc':
        return products.sort((a, b) => a.precio - b.precio);
      case 'precioDesc':
        return products.sort((a, b) => b.precio - a.precio);
      case 'stockAsc':
        return products.sort((a, b) => a.stock - b.stock);
      case 'stockDesc':
        return products.sort((a, b) => b.stock - a.stock);
      case 'nombreAsc':
        return products.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'nombreDesc':
        return products.sort((a, b) => b.nombre.localeCompare(a.nombre));
      default:
        return products;
    }
  }
}
