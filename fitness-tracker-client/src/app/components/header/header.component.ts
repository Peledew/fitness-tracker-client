import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserStoreService } from '../../core/services/user-store.service';
import { CommonModule } from '@angular/common';
declare var M: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public role!: string;
  constructor(
    private authService: AuthService,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.getRole();

    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }

  getRole(): void {
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
