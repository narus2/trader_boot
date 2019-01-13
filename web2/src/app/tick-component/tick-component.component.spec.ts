import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickComponentComponent } from './tick-component.component';

describe('TickComponentComponent', () => {
  let component: TickComponentComponent;
  let fixture: ComponentFixture<TickComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
