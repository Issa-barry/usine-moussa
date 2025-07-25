import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenceNewComponent } from './agence-new.component';

const routes: Routes = [{ path: '', component: AgenceNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenceNewRoutingModule { }
