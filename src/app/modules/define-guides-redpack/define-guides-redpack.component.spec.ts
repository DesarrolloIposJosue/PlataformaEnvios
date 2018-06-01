import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineGuidesRedpackComponent } from './define-guides-redpack.component';

describe('DefineGuidesRedpackComponent', () => {
  let component: DefineGuidesRedpackComponent;
  let fixture: ComponentFixture<DefineGuidesRedpackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineGuidesRedpackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineGuidesRedpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
