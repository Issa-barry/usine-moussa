import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingDetailComponent } from './packing-detail.component';

const routes: Routes = [{ path: '', component: PackingDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingDetailRoutingModule { }
