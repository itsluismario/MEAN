// post-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { PostsService } from '../post.service';
import { TPost } from '../post.model';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule, HlmButtonDirective, ErrorComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private postId: string | null = null;
  private mode = 'create';
  post: TPost = {
    id: '',
    title: '',
    content: ''
  };

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        if (postId) {
          const foundPost = this.postsService.getPost(postId);
          if (foundPost) {
            this.post = foundPost;
          }
        }
      } else {
        this.mode = 'create';
        this.post = {
          id: '',
          title: '',
          content: ''
        };
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.onAddPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
