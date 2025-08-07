import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutTypeDto } from '../../../core/models/workout-typeDto';
import { WorkoutTypeService } from '../../../core/services/workout-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-types-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-types-management.component.html',
  styleUrl: './workout-types-management.component.scss',
})
export class WorkoutTypesManagementComponent implements OnInit {
  workoutTypes: WorkoutTypeDto[] = [];

  constructor(
    private workoutTypeService: WorkoutTypeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadWorkoutTypes();
  }

  loadWorkoutTypes(): void {
    this.workoutTypeService.getAll().subscribe((res: WorkoutTypeDto[]) => {
      this.workoutTypes = res;
    });
  }

  onAdd() {
    this.router.navigate(['new/workout-type']);
  }

  onPreview(workoutTypeId: number) {
    this.router.navigate(['preview/workout-type', workoutTypeId]);
  }

  onDelete(id: number): void {
    this.workoutTypeService.delete(id).subscribe({
      next: () => {
        this.loadWorkoutTypes();
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }
}
