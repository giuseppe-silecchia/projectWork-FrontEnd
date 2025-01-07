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
  /*
  * Componente principale dove viene visualizzata la applicazione se autenticato, composto da 3 elementi:
  * App-navbar: Componente per la barra di navigazione principale
  * ngx-spinner: Componente per la visualizzazione dello spinner in caso di caricamento di dati.
  * router-outlet: Componente che permette di visualizzare il contenuto generato dalla rotta (route.)
  * */
}
