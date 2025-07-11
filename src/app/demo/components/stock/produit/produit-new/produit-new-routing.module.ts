import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitNewComponent } from './produit-new.component';

const routes: Routes = [{ path: '', component: ProduitNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitNewRoutingModule { }
