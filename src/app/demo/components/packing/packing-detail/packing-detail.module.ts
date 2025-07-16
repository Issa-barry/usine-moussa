import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingDetailRoutingModule } from './packing-detail-routing.module';
import { PackingDetailComponent } from './packing-detail.component';


@NgModule({
  declarations: [
    PackingDetailComponent
  ],
  imports: [
    CommonModule,
    PackingDetailRoutingModule
  ]
})
export class PackingDetailModule { }
