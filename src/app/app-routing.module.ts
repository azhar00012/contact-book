import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from '../app/contact/contact.component';
import { ViewContactComponent } from '../app/view-contact/view-contact.component';

const routes: Routes = [
  { path: 'view', component: ViewContactComponent },
  { path: 'view/:contactId', component: ViewContactComponent },
  { path: '**', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
