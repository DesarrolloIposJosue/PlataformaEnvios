import { TestBed, inject } from '@angular/core/testing';

import { SubClientService } from './sub-client.service';

describe('SubClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubClientService]
    });
  });

  it('should be created', inject([SubClientService], (service: SubClientService) => {
    expect(service).toBeTruthy();
  }));
});
