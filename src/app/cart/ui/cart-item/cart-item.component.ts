import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProductItemCart, Product } from '../../../shared/interfaces/interfaces';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    RouterLink, 
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  productCartItem = input.required<ProductItemCart>();

  onRemove = output<number>();

  onIncrease = output<ProductItemCart>();

  onDecrease = output<ProductItemCart>();

  onFav = output<Product>();
}
