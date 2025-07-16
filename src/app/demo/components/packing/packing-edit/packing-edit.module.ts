import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingEditRoutingModule } from './packing-edit-routing.module';
import { PackingEditComponent } from './packing-edit.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PackingEditComponent
  ],
  imports: [
    CommonModule,
    PackingEditRoutingModule,
     FormsModule,          
    DropdownModule,       
    InputTextModule,     
    ButtonModule     
  ]
})
export class PackingEditModule { }
 