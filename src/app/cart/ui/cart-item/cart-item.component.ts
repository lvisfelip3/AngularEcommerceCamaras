import { Component, input, LOCALE_ID, output } from '@angular/core';
import { ProductItemCart } from '../../../shared/interfaces/interfaces';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es_CL' }],
})
export class CartItemComponent {
  productCartItem = input.required<ProductItemCart>();

  onRemove = output<number>();

  onIncrease = output<ProductItemCart>();

  onDecrease = output<ProductItemCart>();
}
