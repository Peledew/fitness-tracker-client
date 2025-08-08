import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeeklyWorkoutStatsisticsDto } from '../../core/models/weekly-workout-statisticsDto';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from '../../core/services/workout.service';
import { UserStoreService } from '../../core/services/user-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workouts-statistics',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workouts-statistics.component.html',
  styleUrl: './workouts-statistics.component.scss',
})
export class WorkoutsStatisticsComponent {
  selectedMonth!: number;
  selectedYear!: number;
  statistics: WeeklyWorkoutStatsisticsDto[] = [];

  constructor(
    private http: HttpClient,
    private workoutService: WorkoutService,
    private userStore: UserStoreService,
  ) {}

  loadStatistics(): void {
    const userId = this.userStore.getUserIdFromStore();

    if (!this.selectedMonth || !this.selectedYear) {
      console.warn('Month and year must be selected.');
      return;
    }

    this.workoutService
      .getWeeklyStatsByUserMonthYear(
        this.userStore.getUserIdFromStore().toString(),
        this.selectedMonth,
        this.selectedYear,
      )
      .subscribe({
        next: (res: WeeklyWorkoutStatsisticsDto[]) => {
          this.statistics = res;
        },
        error: (err) => {
          console.error('Failed to load statistics:', err);
          this.statistics = [];
        },
      });
  }
}
