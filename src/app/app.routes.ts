import {  Routes } from '@angular/router';
import { FolioComponent } from './folio/folio.component';
import { ContactComponent } from './contact/contact.component';



export const routes: Routes = [
  { path: '', component: FolioComponent },          // Default route
  { path: 'folio', component: FolioComponent },     // Route for folio component
  { path: 'contact', component: ContactComponent } // Route for contact component
 
];
