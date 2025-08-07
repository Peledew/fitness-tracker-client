import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './abstract/base.service';
import { ReadWorkoutDto } from '../models/readWorkoutDto';
import { WriteWorkoutDto } from '../models/writeWorkoutDto';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends BaseService<ReadWorkoutDto, WriteWorkoutDto> {
  constructor(http: HttpClient) {
    super(http, 'workouts');
  }
}
