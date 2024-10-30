// error/error.component.ts
import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgIf],
  template: `
    <p *ngIf="errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </p>
  `
})
export class ErrorComponent {
  @Input() errorMessage: string | null = null;
}
