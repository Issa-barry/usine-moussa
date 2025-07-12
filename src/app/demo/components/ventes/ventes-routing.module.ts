import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { CommandeListeComponent } from './commande/commande-liste/commande-liste.component';

const routes: Routes = [{ path: '', component: CommandeListeComponent }, { path: 'commande', loadChildren: () => import('./commande/commande.module').then(m => m.CommandeModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentesRoutingModule { }
