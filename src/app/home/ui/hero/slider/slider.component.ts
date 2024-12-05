import { AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import { CarouselModule, CarouselPageEvent } from 'primeng/carousel';

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
export class SliderComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    const indicators = document.querySelectorAll('.heroIndicator');
    indicators.forEach((indicator, index) => {
      if (index === 0) {
        indicator.classList.add('!bg-blue-500');
        indicator.classList.add('dark:!bg-white');
      }
    });
  }

  updateIndicatorStyle(event:CarouselPageEvent) {
    const indicators = document.querySelectorAll('.heroIndicator');
    indicators.forEach((indicator, index) => {
    if (index === event.page) {
      indicator.classList.add('!bg-blue-500');
      indicator.classList.add('dark:!bg-white');
    } else {
      indicator.classList.remove('!bg-blue-500');
      indicator.classList.remove('dark:!bg-white');
    }
  });
  }
}
