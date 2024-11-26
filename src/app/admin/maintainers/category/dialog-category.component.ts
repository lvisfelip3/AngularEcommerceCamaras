import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="dialog">
      <h1 mat-dialog-title class="title">
        {{ data ? 'Editar Categoría' : 'Añadir Categoría' }}
      </h1>
      <div mat-dialog-content>
        <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Nombre</mat-label>
            <input
              matInput
              formControlName="nombre"
              placeholder="Nombre de la categoría"
            />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Descripción</mat-label>
            <input
              matInput
              formControlName="descripcion"
              placeholder="Descripción"
            />
          </mat-form-field>
        </form>
      </div>
      <div mat-dialog-actions class="footer">
        <button mat-button (click)="onCancel()"
        class="!rounded-lg">Cancelar</button>
        <button
          mat-flat-button
          class="!rounded-lg"
          [disabled]="!categoryForm.valid"
          (click)="onSubmit()"
        >
          Guardar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {
    this.categoryForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}
