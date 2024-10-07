import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsoBougthComponent } from './also-bougth.component';

describe('AlsoBougthComponent', () => {
  let component: AlsoBougthComponent;
  let fixture: ComponentFixture<AlsoBougthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlsoBougthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlsoBougthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
