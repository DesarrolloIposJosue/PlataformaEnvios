import { TestBed, inject } from '@angular/core/testing';

import { AutoLogOutService } from './auto-log-out.service';

describe('AutoLogOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoLogOutService]
    });
  });

  it('should be created', inject([AutoLogOutService], (service: AutoLogOutService) => {
    expect(service).toBeTruthy();
  }));
});
