import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating-readonly',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-3">
      @if (isMain()) {
        <span class="text-gray-800 dark:text-gray-200 font-semibold">{{ rating() }}</span>
      }
      <div class="flex items-center gap-0.5">
        @for (star of stars(); track $index) {
          <span class="star" [class.filled]="star"> ★ </span>
        }
      </div>
      @if (isMain()) {
        <span class="text-gray-800 dark:text-gray-200 font-medium">({{ totalRatings() }})</span>
      }
    </div>
  `,
  styles: [`
    .star { 
      color: #ddd; 
      font-size: 24px;
    }
    .star.filled { 
      @apply text-blue-600 dark:text-green-400;
    }
  `]
})
export class StarRatingReadonlyComponent {
  rating = input<number>(0);
  totalRatings = input<number>(0);
  isMain = input<boolean>(false);

  stars = computed(() => {
    const ratingValue = this.rating();
    return Array(5).fill(false).map((_, i) => i < ratingValue);
  });
}