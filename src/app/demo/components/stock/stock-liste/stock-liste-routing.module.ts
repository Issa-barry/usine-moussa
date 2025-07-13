import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListeComponent } from './stock-liste.component';

const routes: Routes = [{ path: '', component: StockListeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockListeRoutingModule { }
