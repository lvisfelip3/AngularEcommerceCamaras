import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentService } from './payment.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SaleInfoDialogComponent } from '@admin/utils/sale-info-dialog/sale-info-dialog.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from '@admin/ui/confirmation-dialog/confirmation-dialog.component';
import { clientData, EmailService, Type } from '@order/services/email.service';
import { PaymentResponse } from '@shared/interfaces/interfaces';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { Action } from '@order/services/email.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatMenuModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationDialogComponent]
})
export class PaymentComponent implements OnInit{

  private readonly paymentService = inject(PaymentService);
  private readonly dialog = inject(MatDialog);
  private readonly _email = inject(EmailService);
  private readonly _snackbar = inject(SnackBarService);

  selected: string | number = '0';
  displayColumns: string[] = ['id', 'nombre_cliente', 'rut_cliente', 'amount', 'method','submethod', 'reference', 'venta', 'date','status', 'actions'];
  dataSource = new MatTableDataSource<PaymentResponse>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.paymentService.getSales().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error('Error al obtener envios:', error);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  status(status: number): string {
    switch (status) {
      case 1:
        return 'Realizado';
      case 2:
        return 'Pendiente';
      case 3:
        return 'Fallido';
      default:
        return 'Desconocido';
    }
  }

  openDialog(saleRef?: number): void{
    this.dialog.open(SaleInfoDialogComponent, {
      width: '500px',
      data: saleRef ?? null
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

  openConfirmation(shipping_id: number, status: number, clientData: clientData): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { 
        nombre: clientData.nombre, 
        status: this.status(status),
        email: clientData.email
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.paymentService.switchStatus(shipping_id, status).subscribe(() => {
          this.statusFilter(this.selected as number);
          this._email.sendMail(clientData).subscribe();
          this._snackbar.showSnackBar('Estado actualizado');
        });
      }
    })
  }

  statusFilter(status: number): void {
    this.paymentService.getSalesByStatus(status).subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error('Error al obtener envios:', error);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  getAction(): Action {
    return Action.UPDATE
  }

  getType() : Type {
    return Type.PAYMENT
  }

}
