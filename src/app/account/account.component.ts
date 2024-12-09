import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OptionsComponent } from "./ui/options/options.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    OptionsComponent,
    RouterOutlet
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {

}
