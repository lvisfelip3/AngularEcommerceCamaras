import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Client } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent {
  @Input() client: Client | null = null
}
