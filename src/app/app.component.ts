import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IsLoadingDirective } from './loading';

@Component({
  selector: 'app-root',
  imports: [FormsModule, IsLoadingDirective],
  styles: `
    :host {
      display: grid;
      grid-template-rows: auto auto 1fr;
      row-gap: 1rem;
      height: 100svh;

      > div {
        border: 4px solid;
      }
    }
  `,
  template: `
    <label>
      <input type="checkbox" [(ngModel)]="loading" />

      Loading
    </label>

    <label>
      Threshold

      <input type="number" [(ngModel)]="threshold" />
    </label>

    <div *isLoading="loading(); threshold: threshold()">Container</div>
  `,
})
export class AppComponent {
  readonly loading = signal(false);

  readonly threshold = signal(500);
}
