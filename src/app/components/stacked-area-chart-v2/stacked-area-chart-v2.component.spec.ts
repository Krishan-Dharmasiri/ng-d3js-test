import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedAreaChartV2Component } from './stacked-area-chart-v2.component';

describe('StackedAreaChartV2Component', () => {
  let component: StackedAreaChartV2Component;
  let fixture: ComponentFixture<StackedAreaChartV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedAreaChartV2Component]
    });
    fixture = TestBed.createComponent(StackedAreaChartV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
