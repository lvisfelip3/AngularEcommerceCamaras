import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ProductsService } from '@products/service/products.service';
import { Product } from '@shared/interfaces/interfaces';
import { SliderComponent } from '@home/ui/hero/slider/slider.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    SliderComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit{

  images: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts(1).subscribe((res) => {
      this.images = res.products;
    });
  }
}