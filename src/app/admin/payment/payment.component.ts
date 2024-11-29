import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackBarService } from '@shared/ui/snack-bar.service';
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
import { CurrencyPipe } from '@angular/common';

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
    CurrencyPipe
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit{

  selected = '0';
  displayColumns: string[] = ['id', 'nombre_cliente', 'rut_cliente', 'amount', 'method', 'reference', 'venta', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  private readonly _snackBar = inject(SnackBarService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

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

  openDialog(saleId?: number): void{
    this.dialog.open(SaleInfoDialogComponent, {
      width: '500px',
      data: saleId ?? null
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  switchStatus(shipping_id: number, status: number): void {
    this.paymentService.switchStatus(shipping_id, status).subscribe(() => {
      this.statusFilter(Number(this.selected));
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      this._snackBar.showSnackBar('Estado actualizado');
    });
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

}
