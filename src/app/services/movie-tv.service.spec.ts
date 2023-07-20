import { TestBed } from '@angular/core/testing';

import { MovieTvService } from './movie-tv.service';

describe('MovieTvService', () => {
  let service: MovieTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
