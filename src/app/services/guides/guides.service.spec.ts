import { TestBed, inject } from '@angular/core/testing';

import { GuidesService } from './guides.service';

describe('GuidesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuidesService]
    });
  });

  it('should be created', inject([GuidesService], (service: GuidesService) => {
    expect(service).toBeTruthy();
  }));
});
