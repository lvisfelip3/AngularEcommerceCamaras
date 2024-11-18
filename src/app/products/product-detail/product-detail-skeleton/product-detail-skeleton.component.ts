import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-detail-skeleton',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div
        class="flex flex-wrap md:flex-nowrap justify-between w-full gap-10 animate-pulse"
      >
        <div class="w-56 h-56 md:w-80 md:h-80 bg-gray-400 rounded-xl"></div>
        <div class="flex flex-col justify-evenly items-start w-full">
          <div class="w-full flex flex-col gap-4 justify-start h-full">
            <div class="h-6 w-2/3 bg-gray-400 rounded mb-1"></div>
            <div class="h-4 w-full bg-gray-400 rounded mb-3"></div>
            <div class="sm:items-center sm:gap-4 sm:flex">
              <div class="h-10 w-1/4 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <button
              title="Favoritos"
              class="!rounded-md !flex !gap-2 !justify-center !items-center"
            >
              <div class="h-10 w-10 bg-gray-400 rounded"></div>
            </button>
            <button
              class="!rounded-md !flex !gap-2 !justify-center !items-center"
            >
              <div class="h-10 w-32 bg-gray-400 rounded"></div>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col px-8">
        <hr class="my-6 md:my-8 border-gray-800 w-full" />
        <div class="h-4 w-full bg-gray-400 rounded animate-pulse"></div>
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailSkeletonComponent {}
