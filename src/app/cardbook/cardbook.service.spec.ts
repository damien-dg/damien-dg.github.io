import { TestBed } from '@angular/core/testing';

import { CardbookService } from './cardbook.service';

describe('CardbookService', () => {
  let service: CardbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
