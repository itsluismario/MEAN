import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule {}
