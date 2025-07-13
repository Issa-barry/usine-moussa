import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeDetailComponent } from './commande-detail.component';

const routes: Routes = [{ path: '', component: CommandeDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeDetailRoutingModule { }
