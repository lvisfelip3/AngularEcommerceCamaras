import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.5 231.5" xml:space="preserve"><path d="M107 146a8 8 0 0 0 15-2l-3-33a8 8 0 0 0-15 1l3 34zm47 6 1 1c4 0 7-3 8-7l3-34a7 7 0 1 0-15-1l-3 33c-1 4 2 8 6 8zm-58 33a23 23 0 1 0 0 47 23 23 0 0 0 0-47zm0 32a8 8 0 1 1 0-17 8 8 0 0 1 0 17zm78-32a23 23 0 1 0 0 47 23 23 0 0 0 0-47zm0 32a8 8 0 1 1 0-17 8 8 0 0 1 0 17z"/><path d="m219 79-6-3H63l-6-24c-1-3-4-6-7-6H19a8 8 0 0 0 0 15h25l6 24v1l23 89c1 3 4 5 8 5h108c4 0 7-2 8-5l23-89-1-7zm-35 86H86L67 91h136l-19 74zM106 53a7 7 0 0 0 10 0c3-3 3-8 0-11L93 19a8 8 0 0 0-11 10l24 24zm53 2 5-2 24-24a7 7 0 1 0-11-10l-23 23a8 8 0 0 0 5 13zm-24-7c4 0 8-3 8-7V8c0-5-4-8-8-8s-7 3-7 7v34c0 4 3 7 7 7z"/></svg>
`;

@Component({
  selector: 'app-icon-empty-cart',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  template: `
    <mat-icon 
    class="!w-36 !h-36  md:!w-48 md:!h-48 text-gray-600 !px-3 !mr-8"
    svgIcon="thumbs-up" aria-hidden="false" aria-label="empty cart"></mat-icon>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
  }

}
