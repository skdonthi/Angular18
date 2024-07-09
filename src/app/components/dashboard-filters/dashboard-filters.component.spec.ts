import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFiltersComponent } from './dashboard-filters.component';

describe('DashboardFiltersComponent', () => {
  let component: DashboardFiltersComponent;
  let fixture: ComponentFixture<DashboardFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFiltersComponent]
    });
    fixture = TestBed.createComponent(DashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
