import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerComponentComponent } from './messenger-component.component';

describe('MessengerComponentComponent', () => {
  let component: MessengerComponentComponent;
  let fixture: ComponentFixture<MessengerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
