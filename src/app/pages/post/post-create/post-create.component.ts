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
        const paramId = paramMap.get('postId');
        if (paramId) {
          this.mode = 'edit';
          this.postId = paramId;
          this.postsService.getPost(paramId).subscribe(postData => {
            this.post = {id: postData._id, title: postData.title, content: postData.content
            }
          });
        }
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = {
          id: '',
          title: '',
          content: ''
        };
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else if (this.postId) {
      this.postsService.updatePost(
          this.postId,
          form.value.title,
          form.value.content,
      );
    }
    form.resetForm();
  }
}
