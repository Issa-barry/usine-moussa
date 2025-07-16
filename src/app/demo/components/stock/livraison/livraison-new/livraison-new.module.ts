import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonNewRoutingModule } from './livraison-new-routing.module';
import { LivraisonNewComponent } from './livraison-new.component';


@NgModule({
  declarations: [
    LivraisonNewComponent
  ],
  imports: [
    CommonModule,
    LivraisonNewRoutingModule
  ]
})
export class LivraisonNewModule { }
