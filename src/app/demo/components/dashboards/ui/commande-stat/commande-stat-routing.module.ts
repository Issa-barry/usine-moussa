import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeStatComponent } from './commande-stat.component';

const routes: Routes = [{ path: '', component: CommandeStatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeStatRoutingModule { }
