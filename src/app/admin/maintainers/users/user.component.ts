import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { User } from '@shared/interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from './dialog-users.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataTableComponent } from "@admin/ui/data-table/data-table.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DataTableComponent
],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit{
  private readonly crudService = inject(UsersService);
  private readonly dialog = inject(MatDialog);
  private readonly fb = inject(FormBuilder);

  users$ = computed(() => this.crudService.users$());

  formAdd: FormGroup;
  isEdit = false;
  selectedUserId: number | null = null;
  columns: string[] = ['id', 'nombre', 'email', 'rol'];
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor() {
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
          this.crudService.updateUser(usuario.id, result)
        } else {
          this.crudService.addUser(result)
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
    this.crudService.getUsers();
  }

  deleteUsuario(id: number): void {
    this.crudService.deleteUser(id);
  }

  reloadTable(): void {
    this.getUsuarios();
  }
}
