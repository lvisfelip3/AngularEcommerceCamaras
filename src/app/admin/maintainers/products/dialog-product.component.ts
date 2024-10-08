import { Component, Inject, OnInit } from '@angular/core';
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
import { Category, Product } from '../../../shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '../category/category.service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <div class="dialog">
      <h1 mat-dialog-title class="title">
        {{ data ? 'Editar Producto' : 'Añadir Producto' }}
      </h1>
      <div mat-dialog-content>
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
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
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Precio</mat-label>
            <input matInput formControlName="precio" placeholder="$90.000" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Stock</mat-label>
            <input matInput formControlName="stock" placeholder="100" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Categoria</mat-label>
            <mat-select formControlName="categoria_id">
              @for (categoria of categorias; track categoria.id) {
                <mat-option [value]="categoria.id">
                  {{ categoria.nombre }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Imagen
            <input
              formControlName="imagen"
              class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              (change)="onChangeImage($event)"
              accept="image/png, image/jpeg"
            />
          </label>
          @if (imagePreview) {
            <img class="image-preview" [src]="imagePreview" alt="vista previa" />
          }
        </form>
      </div>
      <div mat-dialog-actions class="footer">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-button [disabled]="!productForm.valid" (click)="onSubmit()">
          Guardar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-product.component.css'],
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  categorias: Category[] = [];
  selectedImage: File | null = null;
  imagePreview: string | undefined;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private crud: CategoriasService,
  ) {
    this.productForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],
      precio: [data?.precio || '', Validators.required],
      stock: [data?.stock || '', Validators.required],
      categoria_id: [data?.categoria_id || '', Validators.required],
      imagen: [data?.imagen],
    });

    if (data) {
      this.imagePreview = data.imagen;
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productForm.value.imagen = this.selectedImage;
      this.dialogRef.close(this.productForm.value);
    }
  }

  getCategories(): void {
    this.crud.getCategories().subscribe((response) => {
      this.categorias = response;
    });
  }

  onChangeImage(event: Event): void {
    const input = event.target as HTMLInputElement; // Asegura que el target es un HTMLInputElement
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string; // Asegura que el target es un FileReader y el result es string
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage = null;
      this.imagePreview = undefined;
    }
  }
}
