import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductEditComponent } from './select-product-edit.component';

describe('SelectProductEditComponent', () => {
  let component: SelectProductEditComponent;
  let fixture: ComponentFixture<SelectProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
