import { ChangeDetectionStrategy, Component} from '@angular/core';
import { SliderComponent } from '@home/ui/hero/slider/slider.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    SliderComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent{
}