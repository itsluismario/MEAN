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
  newPost = "NO CONTENT";

  onAddPost() {
    alert('Your post content is: ' + this.newPost);  // Add this line
    console.log(this.newPost);
  }
}
