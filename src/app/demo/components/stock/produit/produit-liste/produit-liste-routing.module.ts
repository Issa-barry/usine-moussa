import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitListeComponent } from './produit-liste.component';

const routes: Routes = [{ path: '', component: ProduitListeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitListeRoutingModule { }
