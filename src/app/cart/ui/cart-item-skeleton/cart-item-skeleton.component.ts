import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-item-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './cart-item-skeleton.component.html',
  styleUrl: './cart-item-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemSkeletonComponent {

}
