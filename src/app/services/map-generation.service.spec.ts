import { TestBed } from '@angular/core/testing';

import { MapGenerationService } from './map-generation.service';

describe('MapGenerationService', () => {
  let service: MapGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
