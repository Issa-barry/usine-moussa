import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonNewComponent } from './livraison-new.component';

const routes: Routes = [{ path: '', component: LivraisonNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonNewRoutingModule { }
