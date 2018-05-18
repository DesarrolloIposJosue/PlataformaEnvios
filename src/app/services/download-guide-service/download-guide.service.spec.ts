import { TestBed, inject } from '@angular/core/testing';

import { DownloadGuideService } from './download-guide.service';

describe('DownloadGuideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadGuideService]
    });
  });

  it('should be created', inject([DownloadGuideService], (service: DownloadGuideService) => {
    expect(service).toBeTruthy();
  }));
});
