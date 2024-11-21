import { NgModule } from '@angular/core';
import { SpartanModule } from './spartan.module';

@NgModule({
  imports: [
    SpartanModule
  ],
  exports: [
    SpartanModule
  ]
})
export class SharedModule { }
