import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  styles: `
    :host {
      display: grid;
      place-content: center;
      background: hsl(0 0 0 / 0.6);
      color: white;
    }
  `,
  template: `<p>Loading...</p>`,
})
export class LoadingComponent {}
