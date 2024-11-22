import { ChangeDetectionStrategy, Component} from '@angular/core';
import { HeroComponent } from './ui/hero/hero.component';
import { FeaturedProductsComponent } from '@home/ui/featured-products/featured-products.component';
import { CartMobileButtonComponent } from '@shared/components/cart-mobile-button/cart-mobile-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturedProductsComponent,
    CartMobileButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
