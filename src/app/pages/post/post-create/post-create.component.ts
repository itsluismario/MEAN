// post-create.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule, HlmButtonDirective],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  enteredValue = "";    // For input
  newPost = "No post added yet"; // For display

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
