import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './abstract/base.service';
import { WorkoutDto } from '../models/workoutDto';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends BaseService<WorkoutDto> {
  constructor(http: HttpClient) {
    super(http, 'workouts');
  }
}
