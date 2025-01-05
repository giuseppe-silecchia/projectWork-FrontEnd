import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-viewer',
  imports: [
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './app-viewer.component.html',
  styleUrl: './app-viewer.component.css'
})
export class AppViewerComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['home']);
  }

}
