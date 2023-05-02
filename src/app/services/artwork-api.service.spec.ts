import { TestBed } from '@angular/core/testing';

import { ArtworkApiService } from './artwork-api.service';

describe('ArtworkApiService', () => {
  let service: ArtworkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtworkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
