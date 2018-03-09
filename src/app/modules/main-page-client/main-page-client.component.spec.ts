import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageClientComponent } from './main-page-client.component';

describe('MainPageClientComponent', () => {
  let component: MainPageClientComponent;
  let fixture: ComponentFixture<MainPageClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
