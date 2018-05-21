import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGuideComponent } from './summary-guide.component';

describe('SummaryGuideComponent', () => {
  let component: SummaryGuideComponent;
  let fixture: ComponentFixture<SummaryGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
