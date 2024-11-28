import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaleInfoService } from '@admin/services/sale-info.service';
import { Client, Payment, Adress, ProductItemOrder } from '@shared/interfaces/interfaces';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientComponent, ProductsComponent, ShippingNPaymentComponent } from '@admin/utils/sale-info-dialog/';


@Component({
  selector: 'app-sale-info-dialog',
  standalone: true,
  imports: [
    MatTabsModule,
    ClientComponent,
    ProductsComponent,
    ShippingNPaymentComponent
  ],
  templateUrl: './sale-info-dialog.component.html',
  styleUrl: './sale-info-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleInfoDialogComponent implements OnInit{
  saleInfoService = inject(SaleInfoService);
  saleInfoClient: Client | null = null;
  saleInfoPayment: Payment | null = null;
  saleInfoAddress: Adress | null = null;
  saleInfoProducts: ProductItemOrder[] = [];

  constructor(
    public dialogRef: MatDialogRef<number>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getSaleInfo();
  }

  getSaleInfo(): void {
    this.saleInfoService.getSaleInfo(this.data).subscribe((response) => {
      console.log(response);
      this.saleInfoClient = response.client;
      this.saleInfoAddress = response.address;
      this.saleInfoPayment = response.payment;
      this.saleInfoProducts = response.productos;

      this.cdr.detectChanges();
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
