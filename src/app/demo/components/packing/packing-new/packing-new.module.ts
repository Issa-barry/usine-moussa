import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingNewRoutingModule } from './packing-new-routing.module';
import { PackingNewComponent } from './packing-new.component';


@NgModule({
  declarations: [
    PackingNewComponent
  ],
  imports: [
    CommonModule,
    PackingNewRoutingModule
  ]
})
export class PackingNewModule { }
