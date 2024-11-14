// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './pages/post/post-create/post-create.component';
import { HeaderComponent } from './pages/header/header.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
