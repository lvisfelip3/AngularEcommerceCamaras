import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';

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
        {{ isEditMode ? 'Editar Usuario' : 'Añadir Usuario' }}
      </h1>
      <div mat-dialog-content>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Nombre</mat-label>
            <input matInput formControlName="nombre" placeholder="Juan Nuñez" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Email</mat-label>
            <input
              matInput
              formControlName="email"
              type="email"
              placeholder="example@example.com"
            />
          </mat-form-field>

          @if (isEditMode && !showPasswordInput) {
            <button mat-button type="button" (click)="showPasswordInput = true">
              ¿Cambiar contraseña?
            </button>
          }
          @if (!isEditMode || showPasswordInput) {
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Contraseña</mat-label>
            <input matInput formControlName="password" placeholder="*******" />
          </mat-form-field>
          }
          <mat-form-field appearance="fill">
            <mat-label class="!text-white">Rol</mat-label>
            <mat-select formControlName="rol">
              <mat-option value="admin"> Administrador </mat-option>
              <mat-option value="cliente"> Cliente </mat-option>
            </mat-select>
          </mat-form-field>
        </form>
      </div>
      <div mat-dialog-actions class="footer">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-button [disabled]="!userForm.valid" (click)="onSubmit()">
          Guardar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {

  userForm: FormGroup;
  showPasswordInput = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null,
  ) {
    this.isEditMode = !!data;

    this.userForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      email: [data?.email || '', Validators.required],
      password: ['', data ? [] : Validators.required],
      rol: [data?.rol || '', Validators.required],
    });

    if (!this.isEditMode) {
      this.showPasswordInput = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
