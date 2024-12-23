import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const PREPARING_ORDER =
  `
  <svg viewBox="0 0 32 32"><path d="M16.722 21.863a4.462 4.462 0 0 0-1.569-.971l-1.218-4.743 14.506-4.058 1.554 6.056-13.273 3.716zM12.104 9.019l9.671-2.705 1.555 6.058-9.67 2.705-1.556-6.058zm.434 11.782c-.27.076-.521.184-.765.303L7.509 4.489H5.905a.993.993 0 0 1-.896.598H3.007c-.553 0-1.001-.469-1.001-1.046s.448-1.045 1.001-1.045h2.002c.336 0 .618.184.8.447h3.08v.051l.046-.014 4.41 17.183a4.635 4.635 0 0 0-.807.138zm.259 1.01c1.869-.523 3.79.635 4.291 2.588.501 1.951-.608 3.957-2.478 4.48-1.869.521-3.79-.637-4.291-2.588s.609-3.957 2.478-4.48zm-.527 4.003c.214.836 1.038 1.332 1.839 1.107s1.276-1.084 1.062-1.92c-.214-.836-1.038-1.332-1.839-1.109-.802.225-1.277 1.085-1.062 1.922zm17.6-4.113-11.684 3.268a4.844 4.844 0 0 0-.132-.842 4.769 4.769 0 0 0-.289-.799l11.623-3.25.482 1.623z"/></svg>
`;

@Component({
  selector: 'app-preparing-order-icon',
  standalone: true,
  imports: [
    MatIconModule
  ],
  template: `
    <mat-icon
    svgIcon="preparing-order" aria-hidden="false" aria-label="preparing-order"
    class="!h-20 !w-20"
    ></mat-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreparingOrderIconComponent {

  constructor() {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);
  
      iconRegistry.addSvgIconLiteral('preparing-order', sanitizer.bypassSecurityTrustHtml(PREPARING_ORDER));
    }

}
