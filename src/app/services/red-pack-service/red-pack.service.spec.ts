import { TestBed, inject } from '@angular/core/testing';

import { RedPackService } from './red-pack.service';

describe('RedPackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedPackService]
    });
  });

  it('should be created', inject([RedPackService], (service: RedPackService) => {
    expect(service).toBeTruthy();
  }));
});
