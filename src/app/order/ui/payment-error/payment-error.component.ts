import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink
  ],
  template: `
  <section class="min-h-screen flex justify-center items-center">
    <article class="bg-red-500 text-white p-4 rounded-lg text-center flex-col">
      <p class="!m-5 !font-semibold">{{ getFlowError(error()) }}</p>
      <a mat-flat-button
          class="!bg-blue-600 !text-white !rounded-lg"
          routerLink="/catalogo">Catálogo
      </a>
    </article>
  </section>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentErrorComponent {

  error = input.required<number>();

  getFlowError(code: number): string {
    switch (code) {
      case 1:
        return 'Pago Pendiente';
      case 3:
        return 'Pago rechazado';
      case 4:
        return 'Pago cancelado';
      case 5:
        return 'Pago revertido';
      default:
        return 'Error desconocido';
    }
  }
}
