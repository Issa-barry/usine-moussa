import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';

import { LivraisonListeRoutingModule } from './livraison-liste-routing.module';
import { LivraisonListeComponent } from './livraison-liste.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    LivraisonListeComponent
  ],
  imports: [
    CommonModule,
    LivraisonListeRoutingModule,
    FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule, 
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule, 
        ProgressBarModule,
        ToastModule,
        DialogModule
  ]
})
export class LivraisonListeModule { }
