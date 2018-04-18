import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuidesToClientComponent } from './add-guides-to-client.component';

describe('AddGuidesToClientComponent', () => {
  let component: AddGuidesToClientComponent;
  let fixture: ComponentFixture<AddGuidesToClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuidesToClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuidesToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
