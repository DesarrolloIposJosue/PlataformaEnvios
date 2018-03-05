import { TestBed, inject } from '@angular/core/testing';

import { ParcelService } from './parcel.service';

describe('ParcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcelService]
    });
  });

  it('should be created', inject([ParcelService], (service: ParcelService) => {
    expect(service).toBeTruthy();
  }));
});
