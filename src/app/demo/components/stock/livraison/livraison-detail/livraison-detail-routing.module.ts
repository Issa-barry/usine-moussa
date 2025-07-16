import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonDetailComponent } from './livraison-detail.component';

const routes: Routes = [{ path: '', component: LivraisonDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonDetailRoutingModule { }
