import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTeammateComponent } from './display-teammate.component';

describe('DisplayTeammateComponent', () => {
  let component: DisplayTeammateComponent;
  let fixture: ComponentFixture<DisplayTeammateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTeammateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTeammateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
