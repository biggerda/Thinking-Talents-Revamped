import { TestBed } from '@angular/core/testing';

import { LoadTeamService } from './load-team.service';

describe('LoadTeamService', () => {
  let service: LoadTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
