import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClientEditGuidesComponent } from './select-client-edit-guides.component';

describe('SelectClientEditGuidesComponent', () => {
  let component: SelectClientEditGuidesComponent;
  let fixture: ComponentFixture<SelectClientEditGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClientEditGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClientEditGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
