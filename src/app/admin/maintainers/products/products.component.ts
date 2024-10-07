import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ProductosService } from './productos.service';
import { Category, Product } from '../../../shared/interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from './dialog-product.component';
import { CategoriasService } from '../category/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
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
  selectedImage: File | null = null;
  imagePreview: string | null = null;

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
        categoria_id: productos.categoria_id
      } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (productos) {
          this.crudService.updateProduct(productos.id, result).subscribe(() => {
            this.getProductos();
          });
        } else {
          this.crudService.addProduct(result).subscribe(() => {
            this.getProductos();
          });
        }
      }
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
      }
    });
  }

  deleteProducto(id: number): void {
    this.crudService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log('Producto eliminado:', response);
        this.dataSource.data = this.dataSource.data.filter((products: Product) => products.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
      }
    });
  }
}
