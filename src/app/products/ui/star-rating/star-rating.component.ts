import { Component, computed, input, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingService } from '@products/service/rating.service';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-0.5">
      @for (star of stars(); track $index;) { 
        <span 
          (click)="rate($index + 1)"
          (focus)="this.ratingService.hoverRatingChange($index + 1)"
          (keyup)="rate($index + 1)"
          (blur)="this.ratingService.hoverRatingChange($index + 1)"
          tabindex="0"
          class="star"
          [class.filled]="star"
        >
          ★
        </span>
        }
    </div>
  </div>
  `,
  styles: [`
    .star { 
      cursor: pointer; 
      color: #ddd; 
      font-size: 36px;
    }
    .star.filled { 
      @apply text-blue-600 dark:text-green-400;
    }
  `]
})
export class StarRatingComponent {
  ratingService = inject(RatingService);
  productoId = input<number>();
  isMain = input<boolean>();

  outputValue = output<number>();

  stars = computed(() => {

    const rating = this.ratingService.hoverRating();

    return Array(5).fill(false).map((_, i) => i < rating);
  });

  rate(value: number) {
    this.outputValue.emit(value);
  }
}