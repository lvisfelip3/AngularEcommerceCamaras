import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DeliveryService } from '@shared/data-access/delivery.service';
import { Ciudad, Client, Comuna } from '@shared/interfaces/interfaces';
import { RutPipePipe } from '@order/utils/rut-pipe.pipe';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    RutPipePipe
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  providers: [RutPipePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit {
  private _formBuilder = inject(FormBuilder)
  private _deliveryService = inject(DeliveryService)
  private _rutPipe = inject(RutPipePipe)

  cities: Ciudad[] = []
  comunas: Comuna[] = []

  ngOnInit(): void {
    this._deliveryService.getCiudades().subscribe((cities: Ciudad[]) => {
      this.cities = cities
    })

    this.firstFormGroup.get('rut')?.valueChanges.subscribe((value) => {
      const formattedRut = this._rutPipe.transform(value || '');
      this.firstFormGroup.get('rut')?.setValue(formattedRut, { emitEvent: false });
    });
  }

  firstFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rut: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['', Validators.required],
    ciudad: ['', Validators.required],
    comuna: [{value: '', disabled: true}, Validators.required],
    direccion: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  async onSubmit(stepper: MatStepper): Promise<void> {
    
    const formValue = this.firstFormGroup.value;

    console.log('mentira seguimo')

    const client: Client = {
      user: undefined,
      nombre: formValue['nombre'] ?? '',
      apellido: formValue['apellido'] ?? '',
      rut: formValue['rut'] ?? '',
      email: formValue['email'] ?? '',
      telefono: formValue['telefono'] ?? ''
    }

    await firstValueFrom(this._deliveryService.saveClient(client).pipe(take(1)));

    stepper.next();
  }

  getComunas(event: MatSelectChange) {
    this._deliveryService.getComunaByCiudad(event.value).subscribe((comunas: Comuna[]) => {
      this.comunas = comunas
      this.firstFormGroup.get('comuna')?.enable();
    })
  }
}
