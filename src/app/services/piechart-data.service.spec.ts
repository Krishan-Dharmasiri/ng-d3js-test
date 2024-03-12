import { TestBed } from '@angular/core/testing';

import { PiechartDataService } from './piechart-data.service';

describe('PiechartDataService', () => {
  let service: PiechartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiechartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
