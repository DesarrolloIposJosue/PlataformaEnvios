import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcelToClientComponent } from './add-parcel-to-client.component';

describe('AddParcelToClientComponent', () => {
  let component: AddParcelToClientComponent;
  let fixture: ComponentFixture<AddParcelToClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParcelToClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParcelToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
