export class WriteWorkoutDto {
  id!: number;
  userId!: number;
  workoutTypeId!: number;
  duration!: string; // hh:mm:ss
  workoutDate!: string; // DateTime -> ISO string
  burnedCalories!: number;
  difficultyLevel!: number;
  postWorkoutFatigueLevel!: number;
  additionalNotes!: string;
}
