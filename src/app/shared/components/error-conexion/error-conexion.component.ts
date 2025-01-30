import { ChangeDetectionStrategy, Component} from '@angular/core';
import { ErrorConexionIconComponent } from './error-conexion-icon.component';

@Component({
  selector: 'app-error-conexion',
  standalone: true,
  imports: [
    ErrorConexionIconComponent
  ],
  template: `
  <section class="flex justify-start items-center w-full h-80">
    <header class="h-full w-2/3 flex justify-center items-center">
      <app-error-conexion-icon></app-error-conexion-icon>
    </header>
    <div class="w-full flex flex-col justify-center items-start">
      <h1 class="!text-4xl !font-semibold text-gray-600 dark:!text-gray-400">Error de Conexión</h1>
      <p class="!text-gray-500 !font-medium dark:!text-gray-500">Hubo un problema al intentar conectarse con el servidor.</p>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorConexionComponent {

}
