import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTypePreviewComponent } from './workout-type-preview.component';

describe('WorkoutTypePreviewComponent', () => {
  let component: WorkoutTypePreviewComponent;
  let fixture: ComponentFixture<WorkoutTypePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTypePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutTypePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
