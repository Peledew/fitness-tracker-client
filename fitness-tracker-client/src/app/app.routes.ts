import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserManagementComponent } from './components/management/user-management/user-management.component';
import { WorkoutTypesManagementComponent } from './components/management/workout-types-management/workout-types-management.component';
import { WorkoutsManagementComponent } from './components/management/workouts-management/workouts-management.component';
import { WorkoutTypePreviewComponent } from './components/preview/workout-type-preview/workout-type-preview.component';
import { WorkoutPreviewComponent } from './components/preview/workout-preview/workout-preview.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'userManagment', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'workoutTypesManagment', component: WorkoutTypesManagementComponent, canActivate: [AuthGuard] },
  { path: 'workoutsManagment', component: WorkoutsManagementComponent, canActivate: [AuthGuard] },
  { path: 'preview/workout-type/:id', component: WorkoutTypePreviewComponent, canActivate: [AuthGuard] },
  { path: 'new/workout-type', component: WorkoutTypePreviewComponent, canActivate: [AuthGuard] },
  { path: 'preview/workout/:id', component: WorkoutPreviewComponent, canActivate: [AuthGuard] },
  { path: 'new/workout', component: WorkoutPreviewComponent, canActivate: [AuthGuard] },
];
