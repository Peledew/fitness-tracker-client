import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsStatisticsComponent } from './workouts-statistics.component';

describe('WorkoutsStatisticsComponent', () => {
  let component: WorkoutsStatisticsComponent;
  let fixture: ComponentFixture<WorkoutsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
