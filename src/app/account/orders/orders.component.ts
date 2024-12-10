import { AccountDataService } from '@account/services/account-data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { User, userOrder } from '@shared/interfaces/interfaces';
import { AuthService } from '@auth/auth.service';
import { EmptyOrdersComponent } from '@account/ui/empty-orders/empty-orders.component';
import { UserOrderItemComponent } from '@account/ui/user-order-item/user-order-item.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    EmptyOrdersComponent,
    UserOrderItemComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {

  user: User | null = null;
  readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  userService = inject(AccountDataService);
  authService = inject(AuthService);
  userOrders: userOrder[] = [];
  
  ngOnInit(): void {
    this.getUserData();
    this.getUserOrders();
  }

  getUserData() {
    this.authService.getUserData().subscribe((user) => {
      this.user = user;
    });
  }

  getUserOrders() {
    if (this.user) {
      return this.userService.getUserOrders(this.user.id).subscribe((orders) => {
        this.userOrders = orders;
        this.cdr.detectChanges();
      });
    }
    return [];
  }
}
