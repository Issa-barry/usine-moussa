import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeNewComponent } from './commande-new.component';

const routes: Routes = [{ path: '', component: CommandeNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeNewRoutingModule { }
