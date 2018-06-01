import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGuidesComponent } from './buy-guides.component';

describe('BuyGuidesComponent', () => {
  let component: BuyGuidesComponent;
  let fixture: ComponentFixture<BuyGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
