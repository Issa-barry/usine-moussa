import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeStatRoutingModule } from './commande-stat-routing.module';
import { CommandeStatComponent } from './commande-stat.component';


@NgModule({
  declarations: [
    CommandeStatComponent
  ],
  imports: [
    CommonModule,
    CommandeStatRoutingModule
  ]
})
export class CommandeStatModule { }
