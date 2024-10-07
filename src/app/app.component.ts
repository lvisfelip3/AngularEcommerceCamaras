import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
})
export class AppComponent {
  title = 'AngularEcommerceCamaras';

}
