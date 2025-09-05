import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureStatRoutingModule } from './facture-stat-routing.module';
import { FactureStatComponent } from './facture-stat.component';


@NgModule({
  declarations: [
    FactureStatComponent
  ],
  imports: [
    CommonModule,
    FactureStatRoutingModule
  ]
})
export class FactureStatModule { }
