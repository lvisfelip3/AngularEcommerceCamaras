import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { User } from '@shared/interfaces/interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';
import { NgRecaptcha3Service } from 'ng-recaptcha3';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private readonly _snackBar = inject(SnackBarService);
  private readonly reCaptchaService = inject(NgRecaptcha3Service);
  private readonly siteKey = environment.RECAPTCHA_SITE_KEY;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initReCaptcha();
  }

  initReCaptcha() {
    this.reCaptchaService.init(this.siteKey).catch((error) => {
      console.error('reCAPTCHA initialization failed:', error);
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.executeReCaptcha();
    } else {
      this._snackBar.showSnackBar('Formulario inválido', 'OK');
    }
  }

  executeReCaptcha() {
    this.reCaptchaService
      .getToken({ action: 'login' })
      .then((token: string) => {
        this.auth.verifyCaptcha(token).subscribe({
          next: (response) => {
            if (response.status === true) {
              this.loginUser();
            }
          },
          error: (error) => {
            this._snackBar.showSnackBar('Error verificando reCAPTCHA', 'OK');
            console.error('Error verificando reCAPTCHA:', error);
          },
        });
      })
      .catch((error) => {
        console.error('Error ejecutando reCAPTCHA:', error);
      });
  }

  private loginUser() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.login(email, password).subscribe({
      next: (response: User) => {
        if (response.token) {
          this.auth.saveToken(response.token);
          this._snackBar.showSnackBar('Inicio de sesión exitoso', 'OK');
          setTimeout(() => {
            window.location.reload();
          }, 1400);
        }
      },
      error:() => {
        this._snackBar.showSnackBar('Usuario o contraseña incorrectos', 'OK');
      },}
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public ngOnDestroy() {
    this.reCaptchaService.destroy();
  }
}
