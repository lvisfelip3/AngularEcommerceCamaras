import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule],
  template: `
    <div class="dialog">
      <h1 mat-dialog-title class="title">
        {{ data.nombre }}
      </h1>
      <div mat-dialog-content>
        <div class="rounded-lg">
          <img src="{{ data.imagen }}" alt="imagen producto" class="w-full h-auto flex justify-center items-center px-5"/>
        </div>
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
        @apply bg-slate-700 !important;
      }

      :host ::ng-deep mat-dialog-content {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
    `,
  ],
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
