import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

import { LivraisonDetailRoutingModule } from './livraison-detail-routing.module';
import { LivraisonDetailComponent } from './livraison-detail.component';


@NgModule({
  declarations: [
    LivraisonDetailComponent
  ],
  imports: [
    CommonModule,
    LivraisonDetailRoutingModule,
     ButtonModule, 
        DividerModule,
        RippleModule
  ]
})
export class LivraisonDetailModule { 

}
