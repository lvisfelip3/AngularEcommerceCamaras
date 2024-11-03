import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '@shared/ui/snack-bar.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatIconModule, 
    RouterLink, 
    CurrencyPipe,
    MatButtonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  private readonly _snackBar = inject(SnackBarService);

  product = input.required<Product>();

  add = output<Product>();

  addToCart(e: Event){
    e.stopPropagation();
    e.preventDefault();

    this.add.emit(this.product());
    this._snackBar.showSnackBar('Producto agregado', 'OK');

  }
}
