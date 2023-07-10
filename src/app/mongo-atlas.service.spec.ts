import { TestBed } from '@angular/core/testing';

import { MongoAtlasService } from './mongo-atlas.service';

describe('MongoAtlasService', () => {
  let service: MongoAtlasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoAtlasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
