import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './pages/post/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { TPost } from './pages/post/post.model'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  storedPosts: TPost[] = []; // Changed from posts to storedPosts and added type

  onPostAdded(post: TPost) {
    this.storedPosts.push(post);
  }
}
