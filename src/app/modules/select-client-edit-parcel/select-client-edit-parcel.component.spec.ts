import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClientEditParcelComponent } from './select-client-edit-parcel.component';

describe('SelectClientEditParcelComponent', () => {
  let component: SelectClientEditParcelComponent;
  let fixture: ComponentFixture<SelectClientEditParcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClientEditParcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClientEditParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
