import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';

const ICON =
  `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M9 17c.85-.63 1.885-1 3-1s2.15.37 3 1" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="15" cy="10.5" rx="1" ry="1.5"/><ellipse cx="9" cy="10.5" rx="1" ry="1.5"/><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" stroke-width="1.5"/></svg>
`;

@Component({
  selector: 'app-icon-empty-product',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  template: `
    <mat-icon 
    class="!w-36 !h-36  md:!w-48 md:!h-48 text-gray-600 !p-0 md:!p-3"
    svgIcon="not-found" aria-hidden="false" aria-label="empty cart"></mat-icon>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundIconComponent {

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('not-found', sanitizer.bypassSecurityTrustHtml(ICON));
  }

}
