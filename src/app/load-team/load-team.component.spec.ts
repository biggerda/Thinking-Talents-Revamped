import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTeamComponent } from './load-team.component';

describe('LoadTeamComponent', () => {
  let component: LoadTeamComponent;
  let fixture: ComponentFixture<LoadTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
