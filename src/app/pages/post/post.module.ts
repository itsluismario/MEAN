import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostCreateComponent,
    PostListComponent
  ]
})
export class PostModule {}
