import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Adress } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-address-profile-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './address-profile-item.component.html',
  styleUrl: './address-profile-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressProfileItemComponent {

  address = input.required<Adress>();
  @Output() remove = new EventEmitter<number>();

}
