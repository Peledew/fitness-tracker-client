import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './abstract/base.service';
import { ReadWorkoutDto } from '../models/readWorkoutDto';
import { WriteWorkoutDto } from '../models/writeWorkoutDto';
import { Observable } from 'rxjs';
import { WeeklyWorkoutStatsisticsDto } from '../models/weekly-workout-statisticsDto';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends BaseService<ReadWorkoutDto, WriteWorkoutDto> {
  constructor(http: HttpClient) {
    super(http, 'workouts');
  }

  getAllByUserId(userId: number): Observable<ReadWorkoutDto[]> {
    return this.http.get<ReadWorkoutDto[]>(`${this.baseUrl}/by-user/${userId}`);
  }

  getWeeklyStatsByUserMonthYear(
    userId: string,
    month: number,
    year: number,
  ): Observable<WeeklyWorkoutStatsisticsDto[]> {
    return this.http.get<WeeklyWorkoutStatsisticsDto[]>(
      `${this.baseUrl}/stats/weekly?userId=${userId}&month=${month}&year=${year}`,
    );
  }
}
