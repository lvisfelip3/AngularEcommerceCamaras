import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { User } from '../../shared/interfaces/interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarService } from '../../shared/ui/snack-bar.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    RouterLink, 
    MatDividerModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup;
  private readonly _snackBar = inject(SnackBarService);
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid) {
      this.auth.login(email, password).subscribe(
        (response: User) => {
          if (response.token) {
            this.auth.saveToken(response.token); 
            this.router.navigate(['/']);
            this._snackBar.showSnackBar('Inicio de sesión exitoso', 'OK');
          }
        },
        () => {
          this._snackBar.showSnackBar('Usuario o contraseña incorrectos', 'OK');
        }
      );
    } else {
      this._snackBar.showSnackBar('Formulario inválido', 'OK');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
