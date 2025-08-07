import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutTypeDto } from '../../../core/models/workout-typeDto';
import { WorkoutTypeService } from '../../../core/services/workout-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-type-preview',
  templateUrl: './workout-type-preview.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class WorkoutTypePreviewComponent implements OnInit {
  workoutTypeForm!: FormGroup;
  id!: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private workoutTypeService: WorkoutTypeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.workoutTypeForm = this.fb.group({
      name: [''],
      description: [''],
    });
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.id;
    if (this.isEditMode) this.loadWorkoutType(this.id);
  }

  loadWorkoutType(id: number): void {
    this.workoutTypeService.getById(id).subscribe((workoutType: WorkoutTypeDto) => {
      this.workoutTypeForm.patchValue({
        name: workoutType.name,
        description: workoutType.description,
      });
    });
  }

  processData(): void {
    if (this.isEditMode) this.update();
    else this.add();
  }

  update(): void {
    if (this.workoutTypeForm.invalid) return;

    const formData = this.workoutTypeForm.value;
    const updatedWorkoutType: WorkoutTypeDto = {
      id: this.id,
      name: formData.name,
      description: formData.description,
    };

    this.workoutTypeService.update(this.id, updatedWorkoutType).subscribe({
      next: () => this.router.navigate(['workoutTypesManagment']),
      error: (err) => console.error('Update failed:', err),
    });
  }

  add(): void {
    if (this.workoutTypeForm.invalid) return;

    const formData = this.workoutTypeForm.value;
    this.workoutTypeService.add(formData).subscribe({
      next: () => this.router.navigate(['workoutTypesManagment']),
      error: (err) => console.error('Creation failed:', err),
    });
  }
}
