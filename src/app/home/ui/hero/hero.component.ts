import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '@products/service/products.service';
import { Product } from '@shared/interfaces/interfaces';
import { SwiperComponent } from '@shared/ui/swiper/swiper.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    RouterLink,
    SwiperComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit{

  images: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts(1).subscribe((products: Product[]) => {
      this.images = products;
    });
  }
}