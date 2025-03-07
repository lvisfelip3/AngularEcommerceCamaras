import { ChangeDetectionStrategy, Component, computed, inject, input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@auth/auth.service';
import { RatingService } from '@products/service/rating.service';
import { EmptyCommentsComponent } from '@products/ui/empty-comments/empty-comments.component';
import { NewCommentDialogComponent } from '@products/ui/new-comment-dialog/new-comment-dialog.component';
import { ProductCommentsItemComponent } from '@products/ui/product-comments-item/product-comments-item.component';
import { SnackBarService } from '@shared/ui/snack-bar.service';

@Component({
  selector: 'app-product-comments',
  standalone: true,
  imports: [
    ProductCommentsItemComponent,
    EmptyCommentsComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <section class="flex flex-col min-h-96 gap-3">
      <header class="flex items-center justify-between">
        <h2 class="!text-3xl !font-semibold text-gray-900 dark:text-gray-100 !m-0">Opiniones del producto</h2>
        <button 
          mat-fab
          class="!bg-blue-600 !w-min !text-nowrap !text-white !text-lg !p-4 !py-6 dark:!bg-green-600 !rounded-lg"
          matTooltip="Añadir opinión"
          (click)="openCommentDialog()"
        >
          <mat-icon class="!m-0">add</mat-icon>
          <span class="sr-only">Añadir opinión</span>
        </button>
      </header>
      <main class="flex flex-col gap-4">
        @for (comment of comments(); track comment.id) {
          <app-product-comments-item [comment]="comment" (onLike)="onLike($event)"/>
        } @empty {
          <app-empty-comments class="block"></app-empty-comments>
        }
      </main>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCommentsComponent implements OnInit, OnDestroy {
  private readonly ratingService = inject(RatingService)
  private readonly authService = inject(AuthService)
  private readonly dialog = inject(MatDialog)
  private readonly snackBar = inject(SnackBarService)

  user = this.authService.getCurrentUser()

  productId = input.required<number>()

  comments = computed(() => this.ratingService.getCommentsByProductId(this.productId()));

  ngOnInit(): void {
    this.ratingService.getProductComments(this.productId()!);
  }
  
  onLike(commentId: number) {
    this.ratingService.likeComment(this.user!.id!, commentId);
  }

  openCommentDialog(): void {
    if (!this.user) return;
    if (this.user.id === this.comments().find(c => c.usuario_id === this.user!.id)?.usuario_id) {
      return this.snackBar.showSnackBar('Ya tienes un comentario de este producto', 'OK');
    }

    this.dialog.open(NewCommentDialogComponent, {
      width: '500px',
      data: {
        producto: this.productId()
      }
    });
  }

  ngOnDestroy(): void {
    this.ratingService.comments.update((current) => {
      const { [this.productId()]: _, ...rest } = current;
      return rest;
    });
  }
}
