import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [
    SliderComponent
  ],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProductsComponent {

}
