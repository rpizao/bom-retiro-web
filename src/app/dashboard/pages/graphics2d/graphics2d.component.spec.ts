import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphics2dComponent } from './graphics2d.component';

describe('GraphicsComponent', () => {
  let component: Graphics2dComponent;
  let fixture: ComponentFixture<Graphics2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Graphics2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Graphics2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
