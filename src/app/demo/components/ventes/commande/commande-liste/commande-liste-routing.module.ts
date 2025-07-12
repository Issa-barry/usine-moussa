import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeListeComponent } from './commande-liste.component';

const routes: Routes = [{ path: '', component: CommandeListeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeListeRoutingModule { }
