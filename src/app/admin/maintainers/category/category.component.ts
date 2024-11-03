import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CategoriasService } from './category.service';
import { Category } from '../../../shared/interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryDialogComponent } from './dialog-category.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '../../../shared/ui/snack-bar.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatTableModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  categorias: Category[] = [];
  formAdd: FormGroup;
  isEdit = false;
  selectedCategoryId: number | null = null;
  displayColumns: string[] = ['id', 'nombre', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  private readonly _snackBar = inject(SnackBarService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private crudService: CategoriasService, 
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.formAdd = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.setupModalReset();
  }

  openDialog(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '500px',
      data: category ? { nombre: category.nombre, descripcion: category.descripcion } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (category) {
          this.crudService.updateCategory(category.id, result).subscribe(() => {
            this._snackBar.showSnackBar('Categoría actualizada correctamente', 'OK');
            this.getCategorias();
          });
        } else {
          this.crudService.addCategory(result).subscribe(() => {
            this._snackBar.showSnackBar('Categoría agregada correctamente', 'OK');
            this.getCategorias();
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
      this.selectedCategoryId = null;
    });
  }

  getCategorias(): void {
    this.crudService.getCategories().subscribe({
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

  onSubmit(): void {
    if (this.isEdit && this.selectedCategoryId !== null) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  private updateCategory(): void {
    this.crudService.updateCategory(this.selectedCategoryId!, this.formAdd.value).subscribe({
      next: (response) => {
        console.log('Categoría actualizada:', response);
        this.getCategorias();
      },
      error: (error) => {
        console.error('Error al actualizar categoría:', error);
      }
    });
  }

  private addCategory(): void {
    this.crudService.addCategory(this.formAdd.value).subscribe({
      next: (response) => {
        console.log('Categoría agregada:', response);
        this.getCategorias();
      },
      error: (error) => {
        console.error('Error al agregar categoría:', error);
      }
    });
  }

  deleteCategory(id: number): void {
    this.crudService.deleteCategory(id).subscribe({
      next: () => {
        this._snackBar.showSnackBar('Producto eliminado', 'OK');
        this.dataSource.data = this.dataSource.data.filter((category: Category) => category.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar categoría:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
