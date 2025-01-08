import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder ,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RutPipePipe } from '@order/utils/rut-pipe.pipe';
import { AuthService } from '@auth/auth.service';
import { AccountDataService } from '@account/services/account-data.service';
import { Client, formValue } from '@shared/interfaces/interfaces';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RutPipePipe]
})
export class PersonalDataComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder)
  private readonly _rutPipe = inject(RutPipePipe)
  private readonly authService = inject(AuthService)
  private readonly accountService = inject(AccountDataService)
  private readonly _snackBar = inject(SnackBarService)

  client: Client | undefined;

  profileGroup = this._formBuilder.group({
    name: ['', [
      Validators.maxLength(40), 
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\u00f1\u00d1\s]+$/u)
    ]],
    apellido: ['', [
      Validators.maxLength(40), 
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\u00f1\u00d1\s]+$/u)
    ]],
    telefono: ['', [ 
      Validators.minLength(9), 
      Validators.pattern(/^[0-9]+$/)
    ]],
    rut: ['', [
      Validators.minLength(9), 
      Validators.pattern(/^[0-9]{1,3}.?[0-9]{1,3}.?[0-9]{1,3}-?[0-9K]$/)
    ]]
  })

  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      if (user) {
        this.getClientIfUser(user.id);
      }
    })

    this.profileGroup.valueChanges.subscribe((value) => {
      if (!this.hasFormChanged(value as Partial<formValue>)) {
        this.profileGroup.setErrors({ noChanges: true });
      }
    });

    this.profileGroup.get('rut')?.valueChanges.subscribe((value) => {
      const formattedRut = this._rutPipe.transform(value || '');
      this.profileGroup.get('rut')?.setValue(formattedRut, { emitEvent: false });
    });
  }

  onSubmit() {
    const value = this.profileGroup.value as Partial<formValue>;

    if (!this.client?.usuario_id) return;
    if (!this.profileGroup.valid || !this.hasFormChanged(value)) return;

    this.accountService.setUserPersonalData(this.client?.usuario_id , value).pipe(
      debounceTime(3000)
    ).
    subscribe({
      next: () => {
        this.getClientIfUser(this.client?.usuario_id as number);
        this._snackBar.showSnackBar('Cambios guardados exitosamente', 'OK');
      },
      error: (error) => {
        console.log(error)
        this._snackBar.showSnackBar('Error al guardar los cambios', 'OK');
      }
    })
  }

  private readonly hasFormChanged = (value: Partial<formValue>): boolean | undefined => {
    return this.client && (
      this.client.apellido !== value.apellido ||
      this.client.telefono !== value.telefono ||
      this.client.rut !== value.rut ||
      this.client.nombre !== value.name
    );
  };

  getClientIfUser(userId: number) {
    this.authService.getClientDataFromUserId(userId).subscribe({
      next: (client) => {
        this.client = client;
        this.profileGroup.get('name')?.setValue(client.nombre);
        this.profileGroup.get('apellido')?.setValue(client.apellido);
        this.profileGroup.get('telefono')?.setValue(client.telefono);
        this.profileGroup.get('rut')?.setValue(client.rut);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
