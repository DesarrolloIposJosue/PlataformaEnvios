import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClientEditComponent } from './select-client-edit.component';

describe('SelectClientEditComponent', () => {
  let component: SelectClientEditComponent;
  let fixture: ComponentFixture<SelectClientEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClientEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
