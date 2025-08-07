import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionsComponent } from './components/options/options.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './core/services/auth.service';
import { UserStoreService } from './core/services/user-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OptionsComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Fitness Tracker';
  public isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.userStore.getIsLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
