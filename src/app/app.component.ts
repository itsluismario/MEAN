import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './pages/post/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';

interface Post {
  title: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  storedPosts: Post[] = []; // Changed from posts to storedPosts and added type

  onPostAdded(post: Post) {
    this.storedPosts.push(post);
  }
}
