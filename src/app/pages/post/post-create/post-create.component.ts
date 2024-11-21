// post-create.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { PostsService } from '../post.service';
import { TPost, TPostForm } from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, ErrorComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit, OnDestroy {
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
    content: '',
    imagePath: '',
    creator: ''
  };
  imagePreview : string | null | ArrayBuffer  = '';
  isLoading = false;
  private postId: string | null = null;
  private authStatusSub: Subscription = new Subscription();
  mode = 'create';

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        const paramId = paramMap.get('postId');
        if (paramId) {
          this.mode = 'edit';
          this.postId = paramId;
          this.isLoading = true;
          this.postsService.getPost(paramId).subscribe(postData => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath, creator: postData.creator
            }
            this.form.patchValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
          });

        }
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = {
          id: '',
          title: '',
          content: '',
          imagePath: '',
          creator: ''
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
    const image = this.form.get('image')?.value;

    if (!title || !content) {
      return;
    }

    if (this.mode === 'create') {
      // Handle both cases where image might be null
      if (image instanceof File) {
        this.postsService.addPost(title, content, image);
      } else {
        this.postsService.addPost(title, content, null);
      }
    } else if (this.postId) {
      this.postsService.updatePost(
        this.postId,
        title,
        content,
        image
      );
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }
}
