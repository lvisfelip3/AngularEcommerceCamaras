import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '@shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="dialog">
      <h1 mat-dialog-title class="title">
        {{ data.nombre }}
      </h1>
      <div mat-dialog-content>
        @defer{
          <img src="{{ data.imagen }}" alt="producto: {{ data.nombre }}" class="w-full h-96 flex justify-center items-center rounded-lg object-cover"/>
        } @loading{
          <div class="flex justify-center items-center">
            <mat-spinner mode="indeterminate"></mat-spinner>
          </div>
        }
      </div>
      <div mat-dialog-actions class="footer">
        <button mat-button (click)="onCancel()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .mat-mdc-text-field-wrapper {
        &::after,
        &::before {
          @apply bg-gray-600 !important;
          @apply text-gray-600 !important;
        }
        @apply bg-gray-600 !important;
        @apply text-gray-600 !important;
      }

      :host ::ng-deep .mdc-line-ripple {
        &::after,
        &::before {
          @apply bg-gray-600 !important;
          @apply text-gray-600 !important;
        }
        @apply bg-gray-600 !important;
        @apply text-gray-600 !important;
      }
      ::ng-deep mat-label {
        width: 100% !important;
      }

      .dialog {
        @apply !bg-slate-700 !p-3 md:!p-4 !min-h-96;
      }

      :host ::ng-deep mat-dialog-content {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
