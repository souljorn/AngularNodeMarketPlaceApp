import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemByTitleComponent } from './search-item-by-title.component';

describe('SearchItemByTitleComponent', () => {
  let component: SearchItemByTitleComponent;
  let fixture: ComponentFixture<SearchItemByTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemByTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemByTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
