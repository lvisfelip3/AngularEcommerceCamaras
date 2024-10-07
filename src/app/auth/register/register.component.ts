import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
    });
  }

  onSubmit() {
    const data: User = this.registerForm.value;

    if (this.registerForm.valid) {
      this.auth.register(data).subscribe(
        (response) => {
          if (response) {
            this.router.navigateByUrl('/auth/login');
          }
        },
        (error) => {
          console.error('Error en el registro', error);
        }
      );
    } else {
      console.error('Formulario no válido');
      this.checkFormValidity(this.registerForm);
    }
  }

  checkFormValidity(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control && control.invalid) {
        const errors = control.errors;
        console.log(`Error en el campo ${field}:`, errors);
      }
    });
  }
}
