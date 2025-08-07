import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsManagementComponent } from './workouts-management.component';

describe('WorkoutsManagementComponent', () => {
  let component: WorkoutsManagementComponent;
  let fixture: ComponentFixture<WorkoutsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
