import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ProductosService } from './productos.service';
import { Category, Product } from '@shared/interfaces/interfaces';
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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
    ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  categorias: Category[] = [];
  categoriasMap: Record<number, string> = {};
  products: Product[] = [];
  formAdd: FormGroup;
  isEdit = false;
  selectedProductId: number | null = null;
  displayColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'creado_en', 'categoria_id', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  private readonly _snackBar = inject(SnackBarService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private crudService: ProductosService, 
    private categoryService: CategoriasService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.formAdd = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      creado_en: ['', Validators.required],
      categoria_id: ['', Validators.required],
      imagen: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProductos();
    this.setupModalReset();
    this.getCategorias();
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
    this.categoryService.getCategories().subscribe((data) => {
      this.categorias = data;

      this.categoriasMap = this.categorias.reduce((map, categoria) => {
        map[categoria.id] = categoria.nombre;
        return map;
      }, {} as Record<number, string>);
    });
  }

  getNombreCategoria(id: number): string {
    return this.categoriasMap[id] || 'Desconocido';
  }

  getProductos(): void {
    this.crudService.getProducts().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteProducto(id: number): void {
    this.crudService.deleteProduct(id).subscribe({
      next: () => {
        this._snackBar.showSnackBar('Registro eliminado', 'OK');
        this.dataSource.data = this.dataSource.data.filter((products: Product) => products.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
