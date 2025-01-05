import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import { RouterOutlet} from '@angular/router';
import {NgxSpinnerComponent} from 'ngx-spinner';

@Component({
  selector: 'app-viewer',
  imports: [
    NavbarComponent,
    RouterOutlet,
    NgxSpinnerComponent,
  ],
  templateUrl: './app-viewer.component.html',
  styleUrl: './app-viewer.component.css'
})
export class AppViewerComponent  {
}
