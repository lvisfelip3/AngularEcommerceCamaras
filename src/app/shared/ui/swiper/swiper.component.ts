import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal,
  Input,
} from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();
import { Product } from '@shared/interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [ CurrencyPipe, RouterLink],
  template: ` <swiper-container
    init="false"
    class="w-[calc(100vw-32px)] p-8 rounded-lg relative"
  >
    @for (image of images; track image.id) {
      <swiper-slide class="relative">
        <img [src]="image.imagen" [alt]="image.nombre" [className]="'w-auto h-1/2 object-cover rounded-3xl'"/>
        <article
          class="absolute bottom-20 right-20 bg-slate-800 rounded-xl p-8 flex flex-col gap-3 items-start">
          <h1 class="text-white text-4xl font-extrabold"> {{ image.nombre }} </h1>
          <p class="text-white text-2xl font-medium"> {{ image.descripcion }} </p>
          <p class="text-white text-2xl font-medium"> {{ image.precio | currency:'CLP' }} </p>
          <a routerLink="/catalogo/producto/{{ image.id }}"
            class="bg-blue-600 text-white w-full p-4 rounded-md hover:bg-blue-700 transition font-medium text-center"> Ver más </a> 
        </article>
      </swiper-slide>
    }
  </swiper-container>`,
  styleUrl: './swiper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements OnInit {
  @Input() images: Product[] = [];
  swiperElement = signal<SwiperContainer | null>(null);

  ngOnInit(): void {
    const swiperElementConstructor = document.querySelector('swiper-container');
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      loop: true,
      pagination: true,
      navigation: true,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
