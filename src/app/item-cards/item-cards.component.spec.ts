import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardsComponent } from './item-cards.component';

describe('ItemCardsComponent', () => {
  let component: ItemCardsComponent;
  let fixture: ComponentFixture<ItemCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
