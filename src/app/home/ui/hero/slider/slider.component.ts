import { Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnChanges, OnDestroy{
  @Input() images: Product[] = [];
  @Input() autoplay = false;     
  @Input() loop = false;         
  @Input() autoplayInterval = 5000; 
  @Input() heroLayout = false;

  currentIndex = 0;

  currentData: Product | undefined;
  autoplayTimeout: ReturnType<typeof setTimeout> | undefined;

  translateX = 0;
  dragStartX = 0;
  isDragging = false;

  updateCurrentSlideUrl(): void {
    if (this.images && this.images.length > 0) {
      this.currentData = this.images[this.currentIndex];
    } else {
      this.currentData = undefined;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['images']){
      this.updateCurrentSlideUrl();
    }
    this.resetAutoplay(); 
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  nextSlide(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCurrentSlideUrl();
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.updateCurrentSlideUrl();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateCurrentSlideUrl();
  }

  resetAutoplay(): void {
    if (this.autoplay) {
      this.clearAutoplay();
      this.autoplayTimeout = setTimeout(() => {
        this.nextSlide();
      }, this.autoplayInterval);
    }
  }

  clearAutoplay(): void {
    if (this.autoplayTimeout) {
      clearInterval(this.autoplayTimeout);
    }
  }

  onMouseOver(): void {
    this.clearAutoplay();
  }

  onMouseOut(): void {
    this.resetAutoplay();
    
  }

  
  // Métodos para el drag (arrastrar)
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.dragStartX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.clearAutoplay();
  }

  onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.translateX = currentX - this.dragStartX;
  }

  onDragEnd(event: MouseEvent | TouchEvent): void {
    this.isDragging = false;
    this.translateX = 0;
    const currentX = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
    if (currentX - this.dragStartX > 400) {
      this.prevSlide();
    } else if (currentX - this.dragStartX < -400) {
      this.nextSlide();
    }
    this.resetAutoplay();
  }
}
