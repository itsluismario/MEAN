import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;

  onLogin(form: NgForm) {
    console.log(form.value);
  }
}
