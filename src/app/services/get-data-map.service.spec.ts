import { TestBed } from '@angular/core/testing';

import { GetDataMapService } from './get-data-map.service';

describe('GetDataMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataMapService = TestBed.get(GetDataMapService);
    expect(service).toBeTruthy();
  });
});
