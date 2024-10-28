import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list-skeleton',
  standalone: true,
  imports: [],
  template: `
    <a href="#">
      <div
        class="border rounded-lg bg-gray-800 border-gray-700 shadow-sm shadow-gray-950 flex w-full animate-pulse"
      >
        <div
          class="h-52 w-52 flex rounded-start-lg justify-center items-center border-r border-gray-600"
        >
          <div class="h-52 w-52 rounded-start-lg bg-gray-600"></div>
        </div>
        <div class="flex flex-col justify-between items-start p-5 w-full">
          <div class="h-5 bg-gray-600 w-32 rounded mb-2"></div>
          <div class="h-4 bg-gray-600 w-16 rounded mb-2"></div>
          <div class="flex items-center justify-between w-full">
            <span class="h-10 w-20 bg-gray-600 rounded"></span>
            <div class="h-10 w-32 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </a>
  `,
  styles: ``,
})
export class ProductListSkeletonComponent {}
