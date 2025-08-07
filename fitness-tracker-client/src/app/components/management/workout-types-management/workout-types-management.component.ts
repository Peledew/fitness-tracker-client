import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutTypeDto } from '../../../core/models/workout-typeDto';
import { WorkoutTypeService } from '../../../core/services/workout-type.service';

@Component({
  selector: 'app-workout-types-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-types-management.component.html',
  styleUrl: './workout-types-management.component.scss',
})
export class WorkoutTypesManagementComponent implements OnInit {
  workouTypes: WorkoutTypeDto[] = [];

  constructor(private workoutTypeService: WorkoutTypeService) {}

  ngOnInit() {
    this.workoutTypeService.getAll().subscribe((res: WorkoutTypeDto[]) => {
      this.workouTypes = res;
    });
  }
}
