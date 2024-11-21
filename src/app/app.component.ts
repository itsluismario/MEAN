// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './pages/auth/auth.service';
import { ErrorDialogComponent } from './error/error-dialog.component';
import { PostModule } from './pages/post/post.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SharedModule,
    RouterOutlet,
    HeaderComponent,
    PostModule,
    ErrorDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
