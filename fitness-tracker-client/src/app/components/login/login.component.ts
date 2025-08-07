import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { TokenDto } from '../../core/models/tokenDto';
import { UserStoreService } from '../../core/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.resetForm();
  }

  resetForm(): void {
    this.authService.resetForm$.subscribe(() => {
      this.loginForm.reset();
    });
  }
  navigateToSignUp() {
    this.router.navigate(['signup']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: TokenDto) => {
          //Success call
          this.loginForm.reset();

          this.authService.storeToken(res.accessToken);

          const tokenPayload = this.authService.decodedToken();
          this.userStore.setUsernameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setUserIdForStore(tokenPayload.nameid);

          this.userStore.setIsLoggedIn(true);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      alert('Login failed');
    }
  }
}
