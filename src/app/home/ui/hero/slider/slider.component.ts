import { ChangeDetectionStrategy, Component} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CarouselModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent{
  images: string[] = [
    'img/heroSection/alhuatecnology.webp',
    'img/heroSection/hikvision.webp',
    'img/heroSection/imou.webp',
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
