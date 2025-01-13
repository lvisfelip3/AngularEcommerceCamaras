import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AccountDataService } from '@account/services/account-data.service';
import { Adress, User } from '@shared/interfaces/interfaces';
import { AuthService } from '@auth/auth.service';
import { AddressProfileItemComponent } from '@account/ui/address-profile-item/address-profile-item.component';
import { DialogCreateAddressComponent } from '@account/ui/dialog-create-address/dialog-create-address.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '@shared/ui/snack-bar.service';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [
    AddressProfileItemComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectionsComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly AuthService = inject(AuthService);
  private readonly AddressService = inject(AccountDataService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(SnackBarService);

  address: Adress[] = [];
  user: User | null = null;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.AuthService.getUserData().subscribe({
      next: (user) => {
        this.user = user;
        if(this.user) {
          this.getUserAddress(this.user.id);
        }
      },
      error: (error) => {
        console.error(error);
        this.user = null;
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    });
  }

  getUserAddress(id: number) {
    this.AddressService.getUserAddress(id).subscribe({
      next: (address) => {
        this.address = address;
      },
      error: (error) => {
        console.error(error);
        this.address = [];
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    });
  }

  openCreateDialog() {
    this.dialog.open(DialogCreateAddressComponent, {
      width: '500px',
      data: this.user?.id
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.AddressService.createAddress(this.user?.id as number, data).subscribe({
          next: (response) => {
            if (response.status === false) {
              return this.snackBar.showSnackBar('Límite de direcciones alcanzado', 'OK');
            }
            this.getUserAddress(this.user?.id as number);
            this.snackBar.showSnackBar('Dirección agregada', 'OK');
          },
          error: (error) => {
            console.error(error);
            this.snackBar.showSnackBar('Error al agregar la dirección', 'OK');
          },
          complete: () => {
            this.cdr.detectChanges();
          }
        })
      }
    });
  }

  onDelete(id: number | undefined) {
    this.AddressService.deleteAddress(id as number).subscribe({
      next: () => {
        this.getUserAddress(this.user?.id as number);
        this.snackBar.showSnackBar('Dirección eliminada', 'OK');
      },
      error: (error) => {
        console.error(error);
        this.snackBar.showSnackBar('Error al eliminar la dirección', 'OK');
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    });
  }
}
