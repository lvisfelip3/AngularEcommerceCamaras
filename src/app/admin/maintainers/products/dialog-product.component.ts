import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '@admin/maintainers/category/category.service';

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
              placeholder="Nombre del producto"
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
              @for (categoria of categories$(); track categoria.id) {
                <mat-option [value]="categoria.id">
                  {{ categoria.nombre }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <label class="block mb-2 text-sm font-medium text-white"
            >Imagen
            <input
              formControlName="imagen"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-slate-200 focus:outline-none file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-gray-100 hover:file:bg-slate-700 file:transition-colors file:duration-100 file:cursor-pointer"
              type="file"
              (change)="onChangeImage($event)"
              accept="image/png, image/jpeg, image/webp"
            />
          </label>
          @if (this.imagePreview()) {
            <img class="image-preview" [src]="this.imagePreview()" alt="vista previa" />
          }
        </form>
      </div>
      <div mat-dialog-actions class="footer">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-flat-button [disabled]="!productForm.valid" (click)="onSubmit()">
          Guardar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  selectedImage = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  private readonly fb = inject(FormBuilder);
  private readonly crud = inject(CategoriasService);
  private readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  categories$ = computed(() => this.crud.categories$());

  constructor(
  ) {
    this.productForm = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || '', Validators.required],
      precio: [this.data?.precio || '', Validators.required],
      stock: [this.data?.stock || '', Validators.required],
      categoria_id: [this.data?.categoria_id || '', Validators.required],
      imagen: [this.data?.imagen],
    });

    if (this.data) {
      this.imagePreview.set(this.data.imagen);
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
      this.productForm.value.imagen = this.selectedImage();
      this.dialogRef.close(this.productForm.value);
    }
  }

  getCategories(): void {
    this.crud.getCategories()
  }

  onChangeImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe superar los 2 MB.');
        this.selectedImage.set(null);
        this.imagePreview.set(null);
        return;
      }

      this.selectedImage.set(file);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage.set(null);
      this.imagePreview.set(null);
    }
  }
}
