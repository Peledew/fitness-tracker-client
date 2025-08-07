import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadWorkoutDto } from '../../../core/models/readWorkoutDto';
import { WorkoutService } from '../../../core/services/workout.service';
import { Router } from '@angular/router';
import { formatISOToDateOnly } from '../../../core/helpers/dateFormatter';

@Component({
  selector: 'app-workouts-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workouts-management.component.html',
  styleUrl: './workouts-management.component.scss',
})
export class WorkoutsManagementComponent implements OnInit {
  workouts: ReadWorkoutDto[] = [];
  formatISOToDateOnly = formatISOToDateOnly;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutService.getAll().subscribe((res: ReadWorkoutDto[]) => {
      this.workouts = res;
    });
  }

  onAdd() {
    this.router.navigate(['new/workout']);
  }

  onPreview(workoutId: number) {
    this.router.navigate(['preview/workout', workoutId]);
  }

  onDelete(id: number): void {
    this.workoutService.delete(id).subscribe({
      next: () => {
        this.loadWorkouts();
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }
}
