import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonListeComponent } from './livraison-liste.component';

const routes: Routes = [{ path: '', component: LivraisonListeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonListeRoutingModule { }
