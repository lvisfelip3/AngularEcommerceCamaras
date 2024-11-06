import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-filter-skeleton',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col justify-start items-start w-full md:w-64 bg-gray-800 p-5 rounded-lg gap-10 mb-3 border border-gray-700 animate-pulse">
        <!-- Heading -->
        <div class="h-5 bg-gray-500 rounded w-1/4 mb-2"></div>
        <!-- Search Field -->
        <div class="w-full h-10 bg-gray-500 rounded"></div>
        <!-- Category Field -->
        <div class="w-full h-10 bg-gray-500 rounded mt-5"></div>
        <!-- Price Label -->
        <div class="h-5 bg-gray-500 rounded w-1/4 mt-5"></div>
        <!-- Price Slider -->
        <div class="w-full h-5 bg-gray-500 rounded mt-2"></div> 
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSkeletonComponent {}
