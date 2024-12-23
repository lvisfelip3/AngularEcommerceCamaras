import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div
      class="border rounded-lg bg-transparent border-gray-200 dark:border-gray-700 shadow-md dark:shadow-none flex flex-wrap md:flex-nowrap w-full animate-pulse"
    >
      <div
        class="min-h-52 w-full md:min-w-60 h-52 md:h-60 md:max-h-60 flex rounded-t-lg md:rounded-e-none md:rounded-s-lg justify-center items-center border-r border-gray-200 dark:border-gray-700"
      >
        <div class="h-full w-full md:min-w-52 rounded-t-lg md:rounded-e-none md:rounded-s-lg bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div class="flex flex-col justify-between items-start p-5 w-full">
        <div class="h-7 bg-gray-300 dark:bg-gray-700 w-52 md:w-32 lg:w-56 rounded mb-2"></div>
        <div class="h-7 bg-gray-300 dark:bg-gray-700 w-16 rounded-2xl mb-2"></div>
        <div class="flex items-center justify-between w-full">
          <span class="h-9 lg:h-12 w-32 md:w-24 lg:w-32 bg-gray-300 dark:bg-gray-700 rounded"></span>
          <div class="h-14 w-14 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListSkeletonComponent {}
