import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListeComponent } from './contact-liste/contact-liste.component';

const routes: Routes = [
   { path: '', component: ContactListeComponent }, 
   { path: 'contact-liste', loadChildren: () => import('./contact-liste/contact-liste.module').then(m => m.ContactListeModule) },
   { path: 'contact-detail/:id', loadChildren: () => import('./contact-detail/contact-detail.module').then(m => m.ContactDetailModule) },
   { path: 'contact-new', loadChildren: () => import('./contact-new/contact-new.module').then(m => m.ContactNewModule) },
   { path: 'contact-affecter-agence', loadChildren: () => import('./contact-affecter-agence/contact-affecter-agence.module').then(m => m.ContactAffecterAgenceModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
 