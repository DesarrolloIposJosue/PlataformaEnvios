import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageClientAdminComponent } from './main-page-client-admin.component';

describe('MainPageClientAdminComponent', () => {
  let component: MainPageClientAdminComponent;
  let fixture: ComponentFixture<MainPageClientAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageClientAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageClientAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
