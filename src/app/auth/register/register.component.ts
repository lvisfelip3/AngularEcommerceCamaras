import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../shared/interfaces/interfaces';
import { SnackBarService } from '../../shared/ui/snack-bar.service';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    RouterLink,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [{
    provide:MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' }
  }]
})
export class RegisterComponent {
  registerForm: FormGroup;
  private readonly _snackBar = inject(SnackBarService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/(?=.*[0-9])(?=.*[!@#$%^&*])/)
      ]],
      nombre: ['', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Z\u00f1\u00d1\s]+$/u)
      ]],
    });
  }

  onSubmit() {
    const data: User = this.registerForm.value;

    if (this.registerForm.valid) {
      this.auth.register(data).subscribe(
        (response) => {
          if (response) {
            this.router.navigateByUrl('/auth/login');
            this._snackBar.showSnackBar('Cuenta creada exitosamente', 'OK');
          }
        },
        () => {
          this._snackBar.showSnackBar('Usuario, email o contraseña incorrectos', 'OK');
        }
      );
    } else {
      this._snackBar.showSnackBar('Formulario inválido', 'OK');
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get nombre() {
    return this.registerForm.get('nombre');
  }
}
