import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button'; 
import { ToolbarModule } from 'primeng/toolbar';

import { ProduitListeRoutingModule } from './produit-liste-routing.module';
import { ProduitListeComponent } from './produit-liste.component';


@NgModule({
  declarations: [
    ProduitListeComponent
  ],
  imports: [
    CommonModule,
    ProduitListeRoutingModule,
     FormsModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        ToolbarModule,
  ]
})
export class ProduitListeModule { }
