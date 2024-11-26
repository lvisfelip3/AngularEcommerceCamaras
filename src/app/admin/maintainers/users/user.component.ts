import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UsersService } from './users.service';
import { User } from '../../../shared/interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from './dialog-users.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SnackBarService } from '../../../shared/ui/snack-bar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit{

  users: User[] = [];
  formAdd: FormGroup;
  isEdit = false;
  selectedUserId: number | null = null;
  displayColumns: string[] = ['id', 'nombre', 'email', 'rol', 'creado_en', 'actions'];
  dataSource = new MatTableDataSource<User>();
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  private readonly _snackBar = inject(SnackBarService);
  
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private crudService: UsersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.formAdd = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      rol: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.setupModalReset();
  }

  openDialog(usuario?: User): void{
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: usuario ? { 
        nombre: usuario.nombre, 
        email: usuario.email,
        rol: usuario.rol,
        password: usuario.password,
      } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (usuario) {
          this.crudService.updateUser(usuario.id, result).subscribe(() => {
            this._snackBar.showSnackBar('Usuario actualizado correctamente', 'OK');
            this.getUsuarios();
          });
        } else {
          this.crudService.addUser(result).subscribe(() => {
            this._snackBar.showSnackBar('Usuario agregado correctamente', 'OK');
            this.getUsuarios();
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
      this.selectedUserId = null;
    });
  }

  getUsuarios(): void {
    this.crudService.getUsers().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteUsuario(id: number): void {
    this.crudService.deleteUser(id).subscribe({
      next: () => {
        this._snackBar.showSnackBar('Registro eliminado', 'OK');
        this.dataSource.data = this.dataSource.data.filter((user: User) => user.id !== id);
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
