import { ChangeDetectionStrategy, Component, computed, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from './category.service';
import { Category } from '@shared/interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryDialogComponent } from './dialog-category.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataTableComponent } from '@admin/ui/data-table/data-table.component';

@Component({
  selector: 'app-add-category',
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
    DataTableComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  formAdd: FormGroup;
  isEdit = false;
  selectedCategoryId: number | null = null;
  private readonly _snackBar = inject(SnackBarService);
  private readonly crudService = inject(CategoriasService);
  private readonly dialog = inject(MatDialog);
  private readonly fb = inject(FormBuilder);

  categories$ = computed(() => this.crudService.categories$());
  columns: string[] = ['id', 'nombre', 'descripcion'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor() {
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
          this.crudService.addCategory(result)
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
    this.crudService.getCategories()
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
    this.crudService.addCategory(this.formAdd.value)
  }

  deleteCategory(id: number): void {
    this.crudService.deleteCategory(id)
  }

  reloadTable() {
    this.getCategorias();
  }
}
