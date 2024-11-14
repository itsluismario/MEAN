import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import type { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  isLoading = false;

  onSignup(form: NgForm) {
    console.log(form.value);
  }
}
