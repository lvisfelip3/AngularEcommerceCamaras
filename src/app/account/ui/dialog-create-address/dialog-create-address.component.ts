import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DeliveryService } from '@order/services/delivery.service';
import { Ciudad, Comuna } from '@shared/interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-create-address',
  standalone: true,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './dialog-create-address.component.html',
  styleUrl: './dialog-create-address.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogCreateAddressComponent implements OnInit {

  fb = inject(FormBuilder);
  _deliveryService = inject(DeliveryService);

  cities: Ciudad[] = [];
  comunas: Comuna[] = [];

  addressForm = this.fb.group({
    direccion: ['', [Validators.required]],
    ciudad_id: ['', [Validators.required]],
    comuna_id: [{ value: '', disabled: true }, [Validators.required]],
    depto: ['', [Validators.pattern(/^[0-9]*$/), Validators.maxLength(4)]],
  })

  constructor(
    public dialogRef: MatDialogRef<DialogCreateAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this._deliveryService.getCiudades().subscribe((cities: Ciudad[]) => {
      this.cities = cities;
      cities.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  getComunas(event: MatSelectChange) {
    this._deliveryService
      .getComunaByCiudad(event.value)
      .subscribe((comunas: Comuna[]) => {
        this.comunas = comunas;
        comunas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.addressForm.get('comuna_id')?.enable();
      });
  }

  onSubmit():void {
    if (!this.addressForm.valid) return;
    this.dialogRef.close(this.addressForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
