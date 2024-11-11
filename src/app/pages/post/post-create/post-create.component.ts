// post-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { PostsService } from '../post.service';
import { TPost, TPostForm } from '../post.model';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule, HlmButtonDirective, ErrorComponent, HlmSpinnerComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  form = new FormGroup<TPostForm>({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    content: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
  });

  post: TPost = {
    id: '',
    title: '',
    content: ''
  };
  imagePreview : string | null | ArrayBuffer  = '';
  isLoading = false;
  private postId: string | null = null;
  mode = 'create';

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        const paramId = paramMap.get('postId');
        if (paramId) {
          this.mode = 'edit';
          this.postId = paramId;
          this.isLoading = true;
          this.postsService.getPost(paramId).subscribe(postData => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content
            }
            this.form.patchValue({
              title: this.post.title,
              content: this.post.content
            });
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

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = '';
    this.form.patchValue({ image: null });
    this.form.get('image')?.updateValueAndValidity();
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const title = this.form.get('title')?.value;
    const content = this.form.get('content')?.value;

    if (!title || !content) {
      return;
    }

    if (this.mode === 'create') {
      this.postsService.addPost(title, content);
    } else if (this.postId) {
      this.postsService.updatePost(
        this.postId,
        title,
        content
      );
    }
    this.form.reset();
  }
}
