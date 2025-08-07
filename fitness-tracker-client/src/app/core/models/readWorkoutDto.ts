import { UserDto } from './userDto';
import { WorkoutTypeDto } from './workout-typeDto';

export class ReadWorkoutDto {
  id!: number;
  user!: UserDto;
  userId!: number;
  type!: WorkoutTypeDto;
  workoutTypeId!: number;
  duration!: string; // hh:mm:ss
  workoutDate!: string; // DateTime -> ISO string
  burnedCalories!: number;
  difficultyLevel!: number;
  postWorkoutFatigueLevel!: number;
  additionalNotes!: string;
}
