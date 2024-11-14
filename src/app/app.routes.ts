import { Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { PostCreateComponent } from './pages/post/post-create/post-create.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
