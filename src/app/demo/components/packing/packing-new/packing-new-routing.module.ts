import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingNewComponent } from './packing-new.component';

const routes: Routes = [{ path: '', component: PackingNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingNewRoutingModule { }
