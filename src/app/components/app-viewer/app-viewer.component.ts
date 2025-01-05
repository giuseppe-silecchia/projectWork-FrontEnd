import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import { RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-viewer',
  imports: [
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './app-viewer.component.html',
  styleUrl: './app-viewer.component.css'
})
export class AppViewerComponent  {
}
