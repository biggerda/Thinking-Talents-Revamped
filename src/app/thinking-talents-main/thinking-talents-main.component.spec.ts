import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingTalentsMainComponent } from './thinking-talents-main.component';

describe('ThinkingTalentsPageComponent', () => {
  let component: ThinkingTalentsMainComponent;
  let fixture: ComponentFixture<ThinkingTalentsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkingTalentsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkingTalentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
