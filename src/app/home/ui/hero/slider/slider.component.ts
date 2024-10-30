import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    CarouselModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
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
