import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailClientComponent } from './contact-detail-client.component';

const routes: Routes = [{ path: '', component: ContactDetailClientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactDetailClientRoutingModule { }
