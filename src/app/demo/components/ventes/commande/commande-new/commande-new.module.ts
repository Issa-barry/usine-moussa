import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup'; 
import { MultiSelectModule } from 'primeng/multiselect';

import { CommandeNewRoutingModule } from './commande-new-routing.module';
import { CommandeNewComponent } from './commande-new.component';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CommandeNewComponent
  ],
  imports: [
    CommonModule,
    CommandeNewRoutingModule,
     FormsModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        RippleModule,
        InputGroupModule,
        InputGroupAddonModule,
        MultiSelectModule,
        TableModule,
        MessageModule,
        ToastModule,
  ]
})
export class CommandeNewModule { }
