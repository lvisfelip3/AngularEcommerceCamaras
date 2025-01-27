import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '@products/service/products.service';
import { CardItemComponent, CardItemSkeletonComponent } from '@home/ui/card-item';

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
    CardItemSkeletonComponent
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  
  private readonly productService = inject(ProductsService);

  responsiveOptions: ResponsiveOption[] | undefined;

  isLoading = computed(() => this.productService.isLoading());
  products$ = computed(() => this.productService.products$());

  ngOnInit(): void {
    this.productService.getProducts(1)?.subscribe();

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
