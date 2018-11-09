import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreateFormComponent } from './profile-create-form.component';

describe('ProfileCreateFormComponent', () => {
  let component: ProfileCreateFormComponent;
  let fixture: ComponentFixture<ProfileCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
