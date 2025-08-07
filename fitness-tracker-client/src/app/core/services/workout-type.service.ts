import { Injectable } from '@angular/core';
import { WorkoutTypeDto } from '../models/workout-typeDto';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './abstract/base.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutTypeService extends BaseService<WorkoutTypeDto> {
  constructor(http: HttpClient) {
    super(http, 'workout-types');
  }
}
