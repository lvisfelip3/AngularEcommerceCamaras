import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '@products/service/products.service';
import { Product } from '@shared/interfaces/interfaces';
import { CardItemComponent, CardItemSkeletonComponent } from '@home/ui/card-item';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CarouselModule,
    CardItemComponent,
    CardItemSkeletonComponent,
    AsyncPipe
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {

  responsiveOptions: ResponsiveOption[] | undefined;
  
  products: Observable<Product[]> | undefined;

  productService = inject(ProductsService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productService.getProducts(1).subscribe((products: Product[]) => {
      this.products = of(products);
      this.cdr.detectChanges();
    });

    this.responsiveOptions = [
      {
        breakpoint: '2560px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1354px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '916px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '584px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
