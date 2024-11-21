import { Routes } from '@angular/router';
import { PostCreateComponent } from './pages/post/post-create/post-create.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
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
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule)
  }
];
