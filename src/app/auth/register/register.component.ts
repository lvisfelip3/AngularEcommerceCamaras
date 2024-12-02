import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../shared/interfaces/interfaces';
import { SnackBarService } from '../../shared/ui/snack-bar.service';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgRecaptcha3Service } from 'ng-recaptcha3';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private readonly _snackBar = inject(SnackBarService);
  private readonly reCaptchaService = inject(NgRecaptcha3Service);
  private readonly siteKey = environment.RECAPTCHA_SITE_KEY;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/(?=.*[0-9])(?=.*[!@#$%^&*])/),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[a-zA-Z\u00f1\u00d1\s]+$/u),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.initReCaptcha();
  }

  initReCaptcha() {
    this.reCaptchaService
      .init(this.siteKey)
      .catch((error) => {
        console.error('reCAPTCHA initialization failed:', error);
      });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.executeReCaptcha();
    } else {
      this._snackBar.showSnackBar('Formulario inválido', 'OK');
    }
  }

  executeReCaptcha() {
    this.reCaptchaService
      .getToken()
      .then((token: string) => {
        this.auth.verifyCaptcha(token).subscribe({
          next: (response) => {
            if (response.status === true) {
              this.registerUser();
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

  private registerUser() {
    const data: User = this.registerForm.value;

    this.auth.register(data).subscribe({
      next: (response) => {
        if (response) {
          this._snackBar.showSnackBar('Cuenta creada exitosamente', 'OK');
          setTimeout(() => {
            window.location.reload();
          }, 1400);
        }
      },
      error: () => {
        this._snackBar.showSnackBar(
          'Usuario, email o contraseña incorrectos',
          'OK',
        );
      },
    });
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

  public ngOnDestroy() {
    this.reCaptchaService.destroy();
  }
}
