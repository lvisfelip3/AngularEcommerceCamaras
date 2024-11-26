import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
    MatMenuModule
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingComponent implements OnInit {
  selected = '0';
  displayColumns: string[] = ['id', 'nombre_cliente', 'rut_cliente', 'direccion', 'ciudad', 'comuna', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  private readonly _snackBar = inject(SnackBarService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private shipping: ShippingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getShipping();
  }

  getShipping() {
    this.shipping.getShipping().subscribe({
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
        return 'Entregado';
      case 2:
        return 'Asignado';
      case 3:
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  }

  openDialog(shipping?: any): void{
    this.dialog.open(SaleInfoDialogComponent, {
      width: '500px',
      data: shipping ? shipping.id : null
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  switchStatus(shipping_id: number, status: number): void {
    this.shipping.switchStatus(shipping_id, status).subscribe(() => {
      this.getShipping();
      this._snackBar.showSnackBar('Estado actualizado');
    });
  } 
}
