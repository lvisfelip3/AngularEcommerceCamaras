import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ShippingService } from './shipping.service';
import { MatDialog } from '@angular/material/dialog';
import { SaleInfoDialogComponent } from '@admin/utils/sale-info-dialog/sale-info-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { Shipping } from '@shared/interfaces/interfaces';
import { DatePipe } from '@angular/common';
import { Action, clientData, EmailService, Type } from '@order/services/email.service';
import { ConfirmationDialogComponent } from '@admin/ui/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-shipping',
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
    DatePipe
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingComponent implements OnInit {
  private readonly shipping = inject(ShippingService);
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(SnackBarService);
  private readonly _email = inject(EmailService);
  
  selected: string | number = '0';
  displayColumns: string[] = ['id', 'nombre_cliente', 'rut_cliente', 'direccion', 'depto', 'ciudad', 'comuna','reference','date','status', 'actions'];
  dataSource = new MatTableDataSource<Shipping>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    this.getShipping();    
  }

  getShipping() {
    this.shipping.getShipping().subscribe({
      next: (response) => {
        console.log(response);
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
        return 'Entregado';
      case 2:
        return 'Asignado';
      case 3:
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  }

  openDialog(shipping?: Shipping): void{
    this.dialog.open(SaleInfoDialogComponent, {
      width: '500px',
      data: shipping ? shipping.reference : null
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  switchStatus(shipping_id: number, status: number, clientData: clientData): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { 
        nombre: clientData.nombre, 
        status: this.status(status),
        email: clientData.email
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.shipping.switchStatus(shipping_id, status).subscribe(() => {
          this.statusFilter(this.selected as number);
          this._email.sendMail(clientData).subscribe();
          this._snackBar.showSnackBar('Estado actualizado');
        });
      }
    });
  } 

  statusFilter(status: number): void {
    this.shipping.getShippingByStatus(status).subscribe({
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
    return Type.DELIVERY
  }
}
