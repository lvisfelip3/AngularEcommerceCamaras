import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DeliveryService } from '@shared/data-access/delivery.service';
import { Adress, Ciudad, Client, Comuna, payMethod } from '@shared/interfaces/interfaces';
import { RutPipePipe } from '@order/utils/rut-pipe.pipe';

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
    RutPipePipe,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  providers: [RutPipePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _deliveryService = inject(DeliveryService);
  private _rutPipe = inject(RutPipePipe);

  cities: Ciudad[] = [];
  comunas: Comuna[] = [];

  selectedPaymentMethodId: number | null = null;

  payMethod: payMethod[] = [
    {id: 1, name:'Webpay' , imageUrl:'img/payMethod/webpay.webp'},
    {id: 2, name:'Flow' , imageUrl:'img/payMethod/flow.webp'},
    {id: 3, name:'Paypal' , imageUrl:'img/payMethod/paypal.webp'}
  ]

  ngOnInit(): void {
    this._deliveryService.getCiudades().subscribe((cities: Ciudad[]) => {
      this.cities = cities;
    });

    this.orderFormGroup.get('client.rut')?.valueChanges.subscribe((value) => {
      const formattedRut = this._rutPipe.transform(value || '');
      this.orderFormGroup
        .get('client.rut')
        ?.setValue(formattedRut, { emitEvent: false });
    });
  }

  orderFormGroup = this._formBuilder.group({
    client: this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    }),
    delivery: this._formBuilder.group({
      ciudad: ['', Validators.required],
      comuna: [{ value: '', disabled: true }, Validators.required],
      direccion: ['', Validators.required],
      depto: [''],
    }),
    payment: this._formBuilder.group({
      method: ['', Validators.required],
    }),
  });

  onSubmit() {

    const client: Client = {
      nombre: this.orderFormGroup.get('client.nombre')?.value ?? '',
      apellido: this.orderFormGroup.get('client.apellido')?.value ?? '',
      rut: this.orderFormGroup.get('client.rut')?.value ?? '',
      email: this.orderFormGroup.get('client.email')?.value ?? '',
      telefono: this.orderFormGroup.get('client.telefono')?.value ?? '',
    };

    const address: Adress = {
      direccion: this.orderFormGroup.get('delivery.direccion')?.value ?? '',
      ciudad: this.orderFormGroup.get('delivery.ciudad')?.value ?? '',
      comuna: this.orderFormGroup.get('delivery.comuna')?.value ?? '',
    };

    const payment = {
      method: this.orderFormGroup.get('payment.method')?.value ?? '',
    };
  }

  getComunas(event: MatSelectChange) {
    this._deliveryService
      .getComunaByCiudad(event.value)
      .subscribe((comunas: Comuna[]) => {
        this.comunas = comunas;
        this.orderFormGroup.get('delivery.comuna')?.enable();
      });
  }

  setPaymentMethod(method: string, id: number) {
    this.orderFormGroup.get('payment.method')?.setValue(method);
    this.orderFormGroup.get('payment.method')?.markAsDirty();
    this.orderFormGroup.get('payment.method')?.updateValueAndValidity();
    this.selectedPaymentMethodId = id;

  }
}
