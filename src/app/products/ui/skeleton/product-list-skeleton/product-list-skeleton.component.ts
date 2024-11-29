import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div
      class="border rounded-lg bg-transparent border-gray-200 dark:border-gray-600 shadow-md dark:shadow-none flex flex-wrap lg:flex-nowrap w-full animate-pulse"
    >
      <div
        class="min-h-52 w-full h-52 lg:w-52 flex rounded-t-lg lg:rounded-e-none lg:rounded-s-lg justify-center items-center border-r border-gray-200 dark:border-gray-600"
      >
        <div class="min-h-52 w-full h-52 lg:w-52 rounded-t-lg lg:rounded-e-none lg:rounded-s-lg bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div class="flex flex-col justify-between items-start p-5 w-full">
        <div class="h-5 bg-gray-300 dark:bg-gray-600 w-52 lg:w-32 rounded mb-2"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-600 w-16 rounded mb-2"></div>
        <div class="flex items-center justify-between w-full">
          <span class="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded"></span>
          <div class="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListSkeletonComponent {}
