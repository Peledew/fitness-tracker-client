import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WriteWorkoutDto } from '../../../core/models/writeWorkoutDto';
import { ReadWorkoutDto } from '../../../core/models/readWorkoutDto';
import { UserDto } from '../../../core/models/userDto';
import { WorkoutTypeDto } from '../../../core/models/workout-typeDto';
import { WorkoutTypeService } from '../../../core/services/workout-type.service';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { UserStoreService } from '../../../core/services/user-store.service';

declare const M: any;

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-preview.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class WorkoutPreviewComponent implements OnInit {
  workoutForm!: FormGroup;
  users: UserDto[] = [];
  workoutTypes: WorkoutTypeDto[] = [];
  isEditMode = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private workoutTypeService: WorkoutTypeService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private userStore: UserStoreService,
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      duration: ['', Validators.required],
      workoutDate: ['', Validators.required],
      burnedCalories: [0, [Validators.required, Validators.min(0)]],
      difficultyLevel: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      postWorkoutFatigueLevel: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      workoutTypeId: [null, Validators.required],
      userId: [this.userStore.getUserIdFromStore(), Validators.required],
      additionalNotes: [''],
    });

    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.id;
    if (this.isEditMode) this.loadWorkout(this.id);

    this.loadWorkoutTypes();
  }

  loadWorkout(id: number): void {
    this.workoutService.getById(id).subscribe((workout: ReadWorkoutDto) => {
      this.workoutForm.patchValue({
        duration: workout.duration,
        workoutDate: workout.workoutDate,
        burnedCalories: workout.burnedCalories,
        difficultyLevel: workout.difficultyLevel,
        postWorkoutFatigueLevel: workout.postWorkoutFatigueLevel,
        additionalNotes: workout.additionalNotes,
        workoutTypeId: workout.workoutTypeId,
        userId: workout.userId,
      });
    });
  }

  loadWorkoutTypes(): void {
    this.workoutTypeService.getAll().subscribe((res: WorkoutTypeDto[]) => {
      this.workoutTypes = res;

      // Re-initialize Materialize select after options are loaded
      setTimeout(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
      }, 1);
    });
  }

  processData(): void {
    if (this.isEditMode) this.update();
    else this.add();
  }

  update(): void {
    if (this.workoutForm.invalid) return;

    const formData = this.workoutForm.value;
    const updatedWorkout: WriteWorkoutDto = {
      id: this.id,
      userId: formData.userId,
      workoutTypeId: formData.workoutTypeId,
      duration: formData.duration,
      workoutDate: formData.workoutDate,
      burnedCalories: formData.burnedCalories,
      difficultyLevel: formData.difficultyLevel,
      postWorkoutFatigueLevel: formData.postWorkoutFatigueLevel,
      additionalNotes: formData.additionalNotes,
    };

    this.workoutService.update(this.id, updatedWorkout).subscribe({
      next: () => this.router.navigate(['workoutsManagment']),
      error: (err) => console.error('Update failed:', err),
    });
  }

  add(): void {
    console.log(this.workoutForm.value);
    if (this.workoutForm.invalid) return;

    const formData = this.workoutForm.value;
    this.workoutTypeService.add(formData).subscribe({
      next: () => this.router.navigate(['workoutsManagment']),
      error: (err) => console.error('Creation failed:', err),
    });
  }
}
