import { ChangeDetectionStrategy, Component} from '@angular/core';
import { HeroComponent } from './ui/hero/hero.component';
import { FeaturedProductsComponent } from '@home/ui/featured-products/featured-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturedProductsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
