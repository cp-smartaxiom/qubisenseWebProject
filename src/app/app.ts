import { Component } from '@angular/core';
import { HomeComponent } from './home/home';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  template: '<app-home></app-home>',
  styles: []
})
export class AppComponent {
  title = 'qubisense-landing';
}