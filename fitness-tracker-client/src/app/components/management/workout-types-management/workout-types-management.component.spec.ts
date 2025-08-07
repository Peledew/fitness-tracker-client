import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTypesManagementComponent } from './workout-types-management.component';

describe('WorkoutTypesManagementComponent', () => {
  let component: WorkoutTypesManagementComponent;
  let fixture: ComponentFixture<WorkoutTypesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTypesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutTypesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
