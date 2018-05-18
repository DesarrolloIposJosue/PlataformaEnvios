import { TestBed, inject } from '@angular/core/testing';

import { CreateGuideService } from './create-guide.service';

describe('CreateGuideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateGuideService]
    });
  });

  it('should be created', inject([CreateGuideService], (service: CreateGuideService) => {
    expect(service).toBeTruthy();
  }));
});
