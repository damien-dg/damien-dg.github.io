import { TestBed } from '@angular/core/testing';

import { DecklistService } from './decklist.service';

describe('DecklistService', () => {
  let service: DecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
