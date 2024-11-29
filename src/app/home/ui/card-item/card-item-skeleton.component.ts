import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-item-skeleton',
  standalone: true,
  imports: [
  ],
  template: `<article class="flex flex-col w-max h-auto border shadow-lg dark:shadow-none border-gray-300 dark:border-gray-600 rounded-lg relative animate-pulse">
  <div class="h-40 w-52 max-w-52 md:h-56 md:w-64 md:max-w-64 bg-gray-300 dark:bg-gray-500 rounded-t-md border-b border-gray-300 dark:border-gray-600"></div>
  <div class="p-4">
    <div class="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/5 mb-4"></div>
    <div class="flex justify-between items-center">
        <div class="h-5 bg-gray-300 dark:bg-gray-500 rounded w-16"></div>
        <div class="flex gap-2">
            <div class="h-9 w-9 bg-gray-300 dark:bg-gray-500 rounded"></div>
            <div class="h-9 w-9 bg-gray-300 dark:bg-gray-500 rounded"></div>
        </div>
    </div>
  </div>
</article>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemSkeletonComponent {
}
