import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import { Product } from '@shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { FavoriteStateService } from '@shared/data-access/fav-state.service';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent {
  product = input.required<Product>()
  cartState = inject(CartStateService).state
  favState = inject(FavoriteStateService).state
  private readonly _snackBar = inject(SnackBarService)

  addToCart(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.cartState.add({ product: this.product(), quantity: 1 });
    this._snackBar.showSnackBar('Producto agregado', 'OK');
  }

  addToFav(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.favState.add(this.product());
    this._snackBar.showSnackBar('Producto agregado a favoritos', 'OK');
  }
}
