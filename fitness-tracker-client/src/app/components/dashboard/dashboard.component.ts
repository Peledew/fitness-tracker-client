import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../core/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public users: any = [];

  public username: string = '';
  constructor(
    private authService: AuthService,
    private userStore: UserStoreService,
  ) {}

  ngOnInit() {
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const username = this.authService.getUsernameFromToken();
      this.username = val || username;
    });
  }
}
