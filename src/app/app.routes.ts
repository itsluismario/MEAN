import { Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { PostCreateComponent } from './pages/post/post-create/post-create.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './pages/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: PostCreateComponent
  },
  {
    path: 'edit/:postId',
    canActivate: [AuthGuard],
    component: PostCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
