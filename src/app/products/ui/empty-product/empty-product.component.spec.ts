import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProductComponent } from './empty-product.component';

describe('EmptyProductComponent', () => {
  let component: EmptyProductComponent;
  let fixture: ComponentFixture<EmptyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
