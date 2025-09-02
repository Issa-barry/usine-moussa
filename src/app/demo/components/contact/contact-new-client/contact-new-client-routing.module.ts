import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactNewClientComponent } from './contact-new-client.component';

const routes: Routes = [{ path: '', component: ContactNewClientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactNewClientRoutingModule { }
