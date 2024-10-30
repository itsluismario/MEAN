// post-create.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TPost } from './../post.model'
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule, HlmButtonDirective, ErrorComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  @Output() postCreated = new EventEmitter<TPost>();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: TPost = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }
}
