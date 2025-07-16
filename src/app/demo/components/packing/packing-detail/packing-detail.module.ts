import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingDetailRoutingModule } from './packing-detail-routing.module';
import { PackingDetailComponent } from './packing-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PackingDetailComponent
  ],
  imports: [
    CommonModule,
    PackingDetailRoutingModule,
    TableModule,
    ButtonModule,
  ]
})
export class PackingDetailModule { }
