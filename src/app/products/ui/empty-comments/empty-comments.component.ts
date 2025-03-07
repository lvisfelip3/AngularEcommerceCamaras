import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empty-comments',
  standalone: true,
  imports: [],
  template: `
  <div class="w-full flex justify-center items-center">
    <p class="text-gray-600 dark:text-gray-300 text-3xl font-semibold">Sé el primero en comentar</p>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyCommentsComponent {

}
