import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphics1dComponent } from './graphics1d.component';

describe('GraphicsComponent', () => {
  let component: Graphics1dComponent;
  let fixture: ComponentFixture<Graphics1dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Graphics1dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Graphics1dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
