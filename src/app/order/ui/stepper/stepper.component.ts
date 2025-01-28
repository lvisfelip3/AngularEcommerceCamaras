import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { DeliveryService } from '@order/services/delivery.service';
import { Adress, Ciudad, Client, Comuna, payMethod, User} from '@shared/interfaces/interfaces';
import { RutPipePipe } from '@order/utils/rut-pipe.pipe';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { PhonePipePipe } from '@order/utils/phone-pipe.pipe';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service'; 
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { AccountDataService } from '@account/services/account-data.service';
import { MatRadioModule } from '@angular/material/radio';
import { tap } from 'rxjs';
import { Action, EmailService, Type } from '@order/services/email.service';


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
    MatRadioModule
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  providers: [
    RutPipePipe,
    PhonePipePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnInit, AfterViewInit {
  private _formBuilder = inject(FormBuilder);
  private _deliveryService = inject(DeliveryService);
  private _rutPipe = inject(RutPipePipe);
  private _phonePipe = inject(PhonePipePipe);
  private _cart = inject(CartStateService).state;
  private _auth = inject(AuthService);
  private readonly _snackBar = inject(SnackBarService);
  private router: Router = inject(Router);
  private readonly accountService = inject(AccountDataService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _email = inject(EmailService);

  cities: Ciudad[] = [];
  comunas: Comuna[] = [];
  addresses: Adress[] = [];
  user: User | null = null;

  selectedPaymentMethodId: number | null = null;

  flowImgUrl = window.matchMedia('(min-width: 501px)').matches ? 'img/payMethod/flow.webp' : 'img/payMethod/flow-mobile.webp'

  payMethod: payMethod[] = [
    // {id: 1, name:'Webpay' , imageUrl:'img/payMethod/webpay.webp'},
    {id: 2, name:'Flow' ,  imageUrl: this.flowImgUrl},
    // {id: 3, name:'Paypal' , imageUrl:'img/payMethod/paypal.webp'},
    {id: 4, name:'Transferencia' , imageUrl:'img/payMethod/transferencia.webp'},
    {id: 5, name:'Contra Pago' , imageUrl:'img/payMethod/contraentrega.webp'}
  ]

  ngOnInit(): void {
    this._auth.getUserData().subscribe((user) => {
      if (user) {
        this.user = user;
        this.orderFormGroup.get('client.email')?.setValue(user.email);
        this.orderFormGroup.get('client.nombre')?.setValue(user.nombre);
        this.getClientIfUser(user.id);
        this.getUserAddress(user.id);
      }
    })

    this._deliveryService.getCiudades().subscribe((cities: Ciudad[]) => {
      this.cities = cities;
      cities.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });

    this.orderFormGroup.get('client.rut')?.valueChanges.subscribe((value) => {
      const formattedRut = this._rutPipe.transform(value || '');
      this.orderFormGroup
        .get('client.rut')
        ?.setValue(formattedRut, { emitEvent: false });
    });

    this.orderFormGroup.get('client.telefono')?.valueChanges.subscribe((value) => {
      const formattedTelefono = this._phonePipe.transform(value || '');
      this.orderFormGroup
        .get('client.telefono')
        ?.setValue(formattedTelefono, { emitEvent: false });
    });

    this.orderFormGroup.get('delivery.direccion_id')?.valueChanges.subscribe(value => {
      if (value !== 0) {
        this.removeAddressValidators();
      } else {
        this.restoreAddressValidators();
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.checkUserAddress();
  }
  

  orderFormGroup = this._formBuilder.group({
    client: this._formBuilder.group({
      tipoDocumento: ['', Validators.required],
      nombre: ['', [ 
        Validators.required,
        Validators.pattern(/^[a-zA-Z\u00f1\u00d1\s]+$/u),
        Validators.maxLength(40),
        Validators.minLength(3)
      ]],
      apellido: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\u00f1\u00d1\s]+$/u),
        Validators.maxLength(40),
        Validators.minLength(3)
      ]],
      rut: ['', [
        Validators.required,
        Validators.pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}-[0-9kK]{1}$/),
        Validators.maxLength(12),
        Validators.minLength(11)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(40),
        Validators.minLength(5)
      ]],
      telefono: ['', [
        Validators.pattern(/^[92]\d{8}$/),
        Validators.maxLength(9),
        Validators.minLength(9),
      ]],
    }),
    delivery: this._formBuilder.group({
      ciudad: ['', Validators.required],
      comuna: [{ value: '', disabled: true }, Validators.required],
      direccion: ['', Validators.required],
      depto: ['', [
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(4),
        ]
      ],
      direccion_id: [0],
    }),
    payment: this._formBuilder.group({
      method: ['', Validators.required],
    }),
  });

  onSubmit() {

    const client: Client = {
      usuario_id: this.user?.id ?? undefined,
      tipoDocumento: this.orderFormGroup.get('client.tipoDocumento')?.value ?? '',
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
      depto: this.orderFormGroup.get('delivery.depto')?.value ?? '',
      direccion_id: this.orderFormGroup.get('delivery.direccion_id')?.value ?? 0,
    };

    const payment = {
      method: this.orderFormGroup.get('payment.method')?.value ?? '',
    };

    const cartProducts = this._cart.products();

    if (payment.method === 'Flow') {
      this._deliveryService.handleFlowPayment(client, address, payment ,cartProducts).subscribe();

    } else {
    
      this._deliveryService.saveClientForPayment(client, address, payment, cartProducts).pipe(
        tap(
          (response) => {
            this._cart.clear();
            this._email.sendMail({ ...client, ...address, ...payment, ...cartProducts, ...response, action: Action.CREATE, type: Type.DELIVERY}).subscribe();
            this.router.navigate([`pedidos/confirmed/${response.orderRef}`]);
          }
        )
      )
      .subscribe();
    }
  }

  getComunas(event: MatSelectChange) {
    this._deliveryService
      .getComunaByCiudad(event.value)
      .subscribe((comunas: Comuna[]) => {
        this.comunas = comunas;
        comunas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.orderFormGroup.get('delivery.comuna')?.enable();
      });
  }

  getUserData() {
    this._auth.getToken()
  }

  setPaymentMethod(method: string, id: number) {
    this.orderFormGroup.get('payment.method')?.setValue(method);
    this.orderFormGroup.get('payment.method')?.markAsDirty();
    this.orderFormGroup.get('payment.method')?.updateValueAndValidity();
    this.selectedPaymentMethodId = id;
  }

  getClientIfUser(userId: number) {
    this._auth.getClientDataFromUserId(userId).subscribe({
      next: (client) => {
        this.orderFormGroup.get('client.nombre')?.setValue(client.nombre);
        this.orderFormGroup.get('client.apellido')?.setValue(client.apellido);
        this.orderFormGroup.get('client.rut')?.setValue(client.rut);
        this.orderFormGroup.get('client.telefono')?.setValue(client.telefono);
        this._snackBar.showSnackBar('Datos rellenados automáticamente', 'OK');
      },
      error: (error) => {
        console.error(error.error.message);
      }
    });
  }

  getUserAddress(userId: number) {
    this.accountService.getUserAddress(userId).subscribe({
      next: (address) => {
        this.addresses = address;
        this.checkUserAddress();
      },
      error: (error) => {
        console.error(error.error.message);
      }
    });
  }

  setAddress(addressId: number) {
    this.orderFormGroup.get('delivery.direccion_id')?.setValue(addressId);
    this.orderFormGroup.get('delivery.direccion_id')?.markAsDirty();
    this.orderFormGroup.get('delivery.direccion_id')?.updateValueAndValidity();
  }

  private removeAddressValidators() {
    const deliveryGroup = this.orderFormGroup.get('delivery');
    
    deliveryGroup?.get('ciudad')?.setValue('');
    deliveryGroup?.get('comuna')?.setValue('');
    deliveryGroup?.get('direccion')?.setValue('');
    deliveryGroup?.get('depto')?.setValue('');

    ['ciudad', 'comuna', 'direccion'].forEach(field => {
      const control = deliveryGroup?.get(field);
      control?.clearValidators();
      control?.updateValueAndValidity();
    });

    document.getElementById('addressCreator')?.classList.add('!hidden');
  }

  private restoreAddressValidators() {
    const deliveryGroup = this.orderFormGroup.get('delivery');

    deliveryGroup?.get('ciudad')?.setValidators(Validators.required);
    deliveryGroup?.get('comuna')?.setValidators(Validators.required);
    deliveryGroup?.get('direccion')?.setValidators(Validators.required);

    ['ciudad', 'comuna', 'direccion'].forEach(field => {
      deliveryGroup?.get(field)?.updateValueAndValidity();
    });

    document.getElementById('addressCreator')?.classList.remove('!hidden');
  }

  showAddressCreator() {
    this.orderFormGroup.get('delivery.direccion_id')?.setValue(0);

    document.querySelector('#addressCreatorButton')?.classList.add('!hidden');
    document.querySelector('#backButton')?.classList.remove('!hidden');
    document.querySelector('#addresses')?.classList.add('!hidden');
  }

  goBack() {
    document.querySelector('#addressCreatorButton')?.classList.remove('!hidden');
    document.querySelector('#backButton')?.classList.add('!hidden');
    document.querySelector('#addresses')?.classList.remove('!hidden');
    document.querySelector('#addressCreator')?.classList.add('!hidden');
  }

  checkUserAddress() {
    if (this.addresses.length <= 0) {
      document.querySelector('#buttonsContainer')?.classList.add('!hidden');
      document.querySelector('#addresses')?.classList.add('!hidden');
      document.getElementById('addressCreator')?.classList.remove('!hidden');
    } else {
      document.querySelector('#buttonsContainer')?.classList.remove('!hidden');
      document.querySelector('#addresses')?.classList.remove('!hidden');
      document.getElementById('addressCreator')?.classList.add('!hidden');
    }
  }
}
