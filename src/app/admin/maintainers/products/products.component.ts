import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from './productos.service';
import { Product } from '@shared/interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from './dialog-product.component';
import { ProductImageDialogComponent } from './dialog-product-image.component';
import { CategoriasService } from '../category/category.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataTableComponent } from '@admin/ui/data-table/data-table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DataTableComponent
    ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  private readonly _snackBar = inject(SnackBarService);
  private readonly dialog = inject(MatDialog);
  private readonly crudService = inject(ProductosService);
  private readonly categoryService = inject(CategoriasService);
  private readonly fb = inject(FormBuilder);

  categorias$ = computed(() => this.categoryService.categories$());
  products$ = computed(() => this.crudService.products$());
  isLoading = computed(() => this.crudService.isLoading());

  categoriasMap: Record<number, string> = {};
  formAdd: FormGroup;
  isEdit = false;
  selectedProductId: number | null = null;
  columns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'categoria'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor() {
    this.formAdd = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      creado_en: ['', Validators.required],
      categoria_id: ['', Validators.required],
      imagen: [null, Validators.required],
    });

    effect(() => {
      this.categoriasMap = this.categorias$().reduce((map, categoria) => {
        map[categoria.id] = categoria.nombre;
        return map;
      }, {} as Record<number, string>)
     }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.getProductos();
    this.setupModalReset();
    this.getCategorias();
  }

  getProductos(): void {
    this.crudService.getProducts();
  }

  openDialog(productos?: Product): void{
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: productos ? { 
        nombre: productos.nombre, 
        descripcion: productos.descripcion,
        precio: productos.precio,
        stock: productos.stock,
        categoria_id: productos.categoria_id,
        imagen: productos.imagen
      } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (productos) {
          this.crudService.updateProduct(productos.id, result, result.imagen).subscribe(() => {
            this._snackBar.showSnackBar('Producto actualizado correctamente', 'OK');
            this.getProductos();
          });
        } else {
          this.crudService.addProduct(result, result.imagen).subscribe(() => {
            this._snackBar.showSnackBar('Producto agregado correctamente', 'OK');
            this.getProductos();
          });
        }
      }
    });
  }

  verImagen(product: Product): void {
    this.dialog.open(ProductImageDialogComponent, {
      width: '500px',
      data: product ? { nombre: product.nombre, imagen: product.imagen } : null
    });
  }

  private setupModalReset(): void {
    const modalElement = document.getElementById('AddProduct');
    modalElement?.addEventListener('hidden.bs.modal', () => {
      this.formAdd.reset();
      this.isEdit = false;
      this.selectedProductId = null;
    });
  }

  getCategorias(): void {
    this.categoryService.getCategories()
  }

  getNombreCategoria(id: number): string {
    return this.categoriasMap[id] || 'Desconocido';
  }

  deleteProducto(id: number): void {
    this.crudService.deleteProduct(id);
  }

  reloadTable() {
    this.getProductos();
  }
}
