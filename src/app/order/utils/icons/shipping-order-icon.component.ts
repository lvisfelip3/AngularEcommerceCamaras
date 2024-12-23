import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const SHIPPING_ORDER =
  `
  <svg viewBox="0 -64 640 640" ><path d="M624 352h-16V244c0-13-5-25-14-34L494 110c-9-9-21-14-34-14h-44V48c0-26-21-48-48-48H112C86 0 64 22 64 48v48H8c-4 0-8 4-8 8v16c0 4 4 8 8 8h272c4 0 8 4 8 8v16c0 4-4 8-8 8H40c-4 0-8 4-8 8v16c0 4 4 8 8 8h208c4 0 8 4 8 8v16c0 4-4 8-8 8H8c-4 0-8 4-8 8v16c0 4 4 8 8 8h208c4 0 8 4 8 8v16c0 4-4 8-8 8H64v128a96 96 0 0 0 192 0h128a96 96 0 0 0 192 0h48c9 0 16-7 16-16v-32c0-9-7-16-16-16zM160 464a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm80-208H416V144h44l100 100v12z"/></svg>
`;

@Component({
  selector: 'app-shipping-order-icon',
  standalone: true,
  imports: [
    MatIconModule
  ],
  template: `
    <mat-icon
    svgIcon="shipping-order" aria-hidden="false" aria-label="shipping-order"
    class="!h-20 !w-20"
    ></mat-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingOrderIconComponent {

  constructor() {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);
  
      iconRegistry.addSvgIconLiteral('shipping-order', sanitizer.bypassSecurityTrustHtml(SHIPPING_ORDER));
    }

}
