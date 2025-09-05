import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureStatComponent } from './facture-stat.component';

const routes: Routes = [{ path: '', component: FactureStatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureStatRoutingModule { }
