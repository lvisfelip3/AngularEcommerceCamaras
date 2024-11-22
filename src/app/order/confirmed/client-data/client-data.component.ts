import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Client } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-client-data',
  standalone: true,
  imports: [],
  templateUrl: './client-data.component.html',
  styleUrl: './client-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDataComponent {
@Input() client: Client | null = null;
}
