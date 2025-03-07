import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RatingService } from '@products/service/rating.service';

@Component({
  selector: 'app-new-comment-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    StarRatingComponent
  ],
  template: `
    <article>
      <header>
        <h2 class="!text-4xl !font-bold !m-0" mat-dialog-title>Agregar Comentario</h2>
      </header>
      <main mat-dialog-content>
        <form [formGroup]="commentForm" class="flex flex-col gap-4">
          <div class="w-full flex flex-col gap-2">
            <span 
              class="text-5xl font-semibold w-full flex justify-center items-center min-h-12"
            > 
              {{commentForm.get('rating')?.value || 0}} 
            </span>

            <app-star-rating 
              class="w-full flex justify-center items-center"
              [isMain]="false" 
              (outputValue)="commentForm.controls['rating'].setValue($event)"
            />
          </div>
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Comentario</mat-label>
            <textarea matInput formControlName="comment"></textarea>
          </mat-form-field>
        </form>
      </main>
      <footer mat-dialog-actions class="flex justify-end items-center">
        <button mat-button (click)="onCancel()">
          Cerrar
        </button>
        <button mat-flat-button (click)="onSubmit()">
          Agregar
        </button>
      </footer> 
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCommentDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<NewCommentDialogComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly ratingService = inject(RatingService);

  commentForm: FormGroup;

  constructor() {
    this.commentForm = this.fb.group({
      comment: [this.data?.comment || '', Validators.required],
      rating: [this.data?.rating || '', Validators.required]
    })
  }

  onSubmit(): void {
    if (!this.commentForm.valid) return;

    this.ratingService.rateProduct(this.data.producto, this.commentForm.get('rating')?.value, this.commentForm.get('comment')?.value);

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
