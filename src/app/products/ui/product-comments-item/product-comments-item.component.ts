import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Comment } from '@shared/interfaces/interfaces';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingReadonlyComponent } from '../star-rating-readonly/star-rating-readonly.component';

@Component({
  selector: 'app-product-comments-item',
  standalone: true,
  imports: [
    StarRatingReadonlyComponent,
    DatePipe,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <article class="flex flex-col gap-2 border shadow-md dark:shadow-none border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <header class="flex items-start justify-between">
        <div class="flex flex-col">
          <h3 class="!m-0 !text-gray-900 dark:!text-gray-100">{{ comment()?.usuario }}</h3>
          <time class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ comment()?.fecha | date:'dd/MM/yyyy' }}</time>
        </div>
        <app-star-rating-readonly
          [rating]="comment()?.rating!" 
          [isMain]="false"
        />
      </header>
      <main>
        <p class="!m-0 !text-gray-900 dark:!text-gray-100">
          {{ comment()?.comentario }}
        </p>
      </main>
      <footer class="flex items-center justify-between">
        <button 
          mat-flat-button 
          class="!flex !gap-2 !bg-gray-900 dark:!bg-gray-300 !text-gray-200 dark:!text-gray-800 !rounded-lg" 
          (click)="onLike.emit(comment()?.id!)"
        >
          <mat-icon class="!m-0">thumb_up</mat-icon>
          <span class="!text-sm">Es útil</span>
          @if (comment()?.likes! > 0) {
            <span class="!text-sm !font-medium !ml-2">
              {{ comment()?.likes }}
            </span>
          }
        </button>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon class="!text-gray-700 dark:!text-gray-400">report</mat-icon>
            <span>Reportar</span>
          </button>
        </mat-menu>
      </footer>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCommentsItemComponent {
  comment = input<Comment>()
  onLike = output<number>()
}
