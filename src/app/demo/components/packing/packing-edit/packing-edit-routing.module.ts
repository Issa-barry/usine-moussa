import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingEditComponent } from './packing-edit.component';

const routes: Routes = [{ path: '', component: PackingEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingEditRoutingModule { }
